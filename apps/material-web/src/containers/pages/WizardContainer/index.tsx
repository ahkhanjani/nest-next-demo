import { useEffect, useState } from 'react';
// mui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// gql
import {
  useGetMaterialLazyQuery,
  useCreateMaterialsMutation,
  useUpdateMaterialMutation,
  MaterialDataObject,
} from '@fm/gql';
// cmp
import CategorySelectStep from './steps/CategorySelectStep';
import MaterialCreateStep from './steps/MaterialCreateStep';
import SnackbarAlert from '../../../components/SnackbarAlert';
// types
import type { GraphQLErrors } from '@apollo/client/errors';
// store
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { setEditingMaterialData } from '../../../store/editing-material';

const steps = ['Category', 'Create', 'Review and Publish'];

const WizardContainer: React.FC = () => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { materialDataArray } = useAppSelector(
    (state) => state.creatingMaterials
  );
  const { editMode, editingMaterialId } = useAppSelector(
    (state) => state.editingMaterial
  );

  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isNextBtnActive, setIsNextBtnActive] = useState<boolean>(false);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] =
    useState<boolean>(false);
  const [errorSnackbarMsg, setErrorSnackbarMsg] = useState<string>('');

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  // get material in edit mode
  const [getMaterial] = useGetMaterialLazyQuery();
  const [createMaterials] = useCreateMaterialsMutation();
  const [updateMaterial] = useUpdateMaterialMutation();

  //
  // ─── DATA ───────────────────────────────────────────────────────────────────────
  //

  const [categoryIdArray, setCategoryIdArray] = useState<string[]>([]);

  // in editing mode, fetch material data
  useEffect(() => {
    const fetchMaterial = async () => {
      if (!editMode) return;

      getMaterial({ variables: { id: editingMaterialId } })
        .then(({ data }) => {
          const {
            title,
            type,
            formData: strFormData,
            category,
          } = data.material;
          const formData: unknown = JSON.parse(strFormData);
          dispatch(
            setEditingMaterialData({
              data: formData,
              publish: false,
              title,
              type,
            })
          );
          setCategoryIdArray(category);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchMaterial();
  }, [dispatch, editMode, editingMaterialId, getMaterial]);

  // handles next/submit button disabled
  useEffect(() => {
    switch (activeStep) {
      case 0:
        if (categoryIdArray.length > 1) setIsNextBtnActive(true);
        else setIsNextBtnActive(false);
        break;
      case 1:
        if (materialDataArray.length) setIsNextBtnActive(true);
        else setIsNextBtnActive(false);
        break;
      default:
        setIsNextBtnActive(false);
    }
  }, [categoryIdArray, materialDataArray, activeStep]);

  //
  // ──────────────────────────────────────────────────────────── DATA HANDLERS ─────
  //

  /**
   * Creates all material in the material data array.
   */
  async function handleCreateMany(): Promise<SubmitResponse> {
    // stringify each material object
    const dataArray: MaterialDataObject[] = materialDataArray.map(
      ({ data, publish, ...rest }) => {
        // stringify form data object
        const formData: string = JSON.stringify(data);
        const status: 'published' | 'unpublished' =
          publish === true ? 'published' : 'unpublished';
        return { formData, status, ...rest };
      }
    );

    const res = await createMaterials({
      variables: {
        materialDataArray: dataArray,
        category: categoryIdArray,
      },
    });

    if (res.errors) return { errors: res.errors };
    if (res.data)
      return {
        message: res.data.createMaterials.createdMaterials.toString(),
      };
    return { errors: 'Unknown response.' };
  }

  /**
   * Updates one material if edit mode is on.
   */
  async function handleUpdateOne(): Promise<SubmitResponse> {
    const { title, type, data } = materialDataArray[0];

    // updating existing material
    const res = await updateMaterial({
      variables: {
        materialId: editingMaterialId,
        category: categoryIdArray,
        title,
        type,
        formData: data,
      },
    });

    if (res.errors) return { errors: res.errors };
    if (res.data)
      return { message: 'Update success: ' + res.data.updateMaterial.message };
    return { errors: 'Unknown response.' };
  }

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Handles sumbitting material data array. Either creates or updates materials
   * based on edit mode.
   */
  async function handleSubmitData() {
    if (!categoryIdArray) {
      showErrorSnackbar('No category selected.');
      return;
    }

    if (!materialDataArray.length) {
      showErrorSnackbar('No material created.');
      return;
    }

    const res = editMode ? await handleUpdateOne() : await handleCreateMany();
    handleResponse(res);
  }

  function handleResponse(res: SubmitResponse) {
    if (res.errors) {
      console.error(res.errors);
      return;
    }

    console.trace(res.message);
  }

  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function showErrorSnackbar(message: string) {
    setErrorSnackbarMsg(message);
    setIsErrorSnackbarOpen(true);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <CategorySelectStep {...{ categoryIdArray, setCategoryIdArray }} />
        );
      case 1:
        return <MaterialCreateStep />;
      case 2:
        return (
          <Typography variant="h5" gutterBottom>
            Materials Created.
          </Typography>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <SnackbarAlert
        severity="error"
        message={errorSnackbarMsg}
        isOpen={isErrorSnackbarOpen}
        setIsOpen={setIsErrorSnackbarOpen}
      />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Material Wizard
          </Typography>
          <Container maxWidth="sm">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Container>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              disabled={!isNextBtnActive}
              onClick={
                activeStep === steps.length - 1 ? handleSubmitData : handleNext
              }
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
export default WizardContainer;

interface SubmitResponseMessage {
  message: string;
  errors?: undefined;
}
interface SubmitResponseErrors {
  message?: undefined;
  errors: string | string[] | Error | Error[] | GraphQLErrors;
}

type SubmitResponse = SubmitResponseMessage | SubmitResponseErrors;

import { useEffect } from 'react';
import { useFormikContext } from 'formik';
// gql
import { useCheckMaterialTitleExistsLazyQuery } from 'graphql/generated';
// cmp
import InputField from '~components/form/InputField';
// types
import { MaterialData } from '~pages/MaterialWizardPage/types';
import type { FormikValues } from '../types';

const TitleInputField: React.FC<TitleInputFieldProps> = ({
  materialDataArray,
  selectedMaterialIndex,
  editMode,
}) => {
  const { values, isSubmitting, setSubmitting, setFieldError } =
    useFormikContext<FormikValues>();

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [checkMaterialTitleExists] = useCheckMaterialTitleExistsLazyQuery();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (isSubmitting) validate();
  }, [isSubmitting]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function validate(): Promise<void> {
    if (editMode) return;

    setSubmitting(false);

    //* check for existing title if:
    const titleExists: boolean =
      //* 1. creating a new material
      selectedMaterialIndex === -1 ||
      //* 2. editing an existing material and the title has changed
      (selectedMaterialIndex >= 0 &&
        values.title !== materialDataArray.at(selectedMaterialIndex)?.title)
        ? await checkTitleExists()
        : false;

    if (titleExists) {
      setFieldError('title', 'Title already exists.');
      return;
    }

    setSubmitting(true);
  }

  /**
   * Checks the local list and the server database for a duplicate title.
   * @returns true if title already exists.
   */
  async function checkTitleExists(): Promise<boolean> {
    //* 1. check if exists in current local list
    // search in local list
    const titleExistsInCurrentList = materialDataArray.find(
      ({ title }) => values.title === title
    );
    // if title already exists set titleExists to true
    if (titleExistsInCurrentList) return true;
    else {
      //* 2. check if exists in database
      // query the database
      const titleExistsInDatabase = await checkMaterialTitleExists({
        variables: { title: values.title },
      });
      // if title already exists set titleExists to true
      if (titleExistsInDatabase.data?.materialTitleExists) return true;
    }

    return false;
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return <InputField name='title' label='Material Title' type='text' />;
};
export default TitleInputField;

interface TitleInputFieldProps {
  materialDataArray: MaterialData[];
  selectedMaterialIndex: number;
  editMode: boolean;
}
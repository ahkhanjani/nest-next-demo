import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
// mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// types
import type { PathCategory } from 'fm/shared-types';
import type {
  CreateCategoryFormikValues as Values,
  CreateCategoryServiceValues,
} from '../types/CreateCategoryValues.interface';
import type { UpdateCategoryFormikValues as UpdateValues } from '../types/UpdateCategoryValues.interface';
import { useCreateMaterialCategoryService } from '../services/CreateCategoryServiceProvider';
import { useUpdateMaterialCategoryService } from '../services/UpdateCategoryServiceProvider';
import { useCategoryListService } from '../services/CategoryListServiceProvider';
import { useAppSelector } from 'fm/material-web-state';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Category name must be at least 3 letters.')
    .required('Title is required.'),
});

const EditDialog: React.FC<EditDialogProps> = ({
  editingCategory,
  isOpen,
  setIsOpen,
}) => {
  const { refetch } = useCategoryListService();
  const { handleSubmit: submitCreate } = useCreateMaterialCategoryService();
  const { handleSubmit: submitUpdate } = useUpdateMaterialCategoryService();

  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { path: categoryPath, lastId: parentId } = useAppSelector(
    (state) => state.categoryPath
  );

  // ─── Formik ─────────────────────────────────────────────────────────────────────

  const formik = useFormik<Values>({
    initialValues: { title: '' },
    validationSchema,
    onSubmit: () => {
      if (editingCategory) {
        handleUpdate();
        return;
      }

      handleCreate();
    },
  });

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleUpdate() {
    if (!editingCategory) return;

    await submitUpdate(
      {
        id: editingCategory.id,
        title: formik.values.title,
      },
      { setErrors: formik.setErrors } as FormikHelpers<UpdateValues>
    );

    handleClose();

    refetch();
  }

  async function handleCreate() {
    await submitCreate(
      {
        parentId,
        title: formik.values.title,
      },
      {
        setErrors: formik.setErrors,
      } as FormikHelpers<CreateCategoryServiceValues>
    );

    handleClose();

    refetch();
  }

  function handleClose() {
    setIsOpen(false);
    formik.resetForm();
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {editingCategory ? 'Edit Category...' : 'Create New Category...'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {editingCategory
            ? `Current name: ${editingCategory?.title}`
            : `Path: ${categoryPath.map(({ title }) => ` ${title}`)}`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Category Title"
          type="text"
          fullWidth
          variant="standard"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {editingCategory ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditDialog;

interface EditDialogProps {
  editingCategory?: PathCategory;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

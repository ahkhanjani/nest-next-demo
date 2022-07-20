import { useFormik } from 'formik';
import * as yup from 'yup';
import { ApolloQueryResult } from '@apollo/client';
// mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// gql
import {
  Exact,
  GetMaterialCategoriesPaginateQuery,
  useUpdateMaterialCategoryMutation,
} from '@fm/gql';
// types
import type { PathCategory } from '@fm/shared-types';
import type { CreateCategoryFormikValues as Values } from '../types/CreateCategoryValues.interface';

const initialValues: Values = { title: '' };

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Category name must be at least 3 letters.')
    .required('Title is required.'),
});

const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({
  editingCategory,
  isOpen,
  setIsOpen,
  refetch,
}) => {
  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [updateMaterialCategory] = useUpdateMaterialCategoryMutation();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function handleUpdate() {
    try {
      const res = await updateMaterialCategory({
        variables: {
          id: editingCategory.id,
          title: formik.values.title,
        },
      });

      if (res.errors) {
        console.error(res.errors);
        return;
      }

      handleClose();
      await refetch();
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    setIsOpen(false);
    formik.resetForm();
  }

  function handleSubmit() {
    if (editingCategory) {
      handleUpdate();
      return;
    }

    handleCreate();
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {editingCategory ? (
        <DialogTitle>Edit Category...</DialogTitle>
      ) : (
        <DialogTitle>Create New Category...</DialogTitle>
      )}
      <DialogContent>
        {editingCategory ? (
          <DialogContentText>
            {`Current name: ${editingCategory?.title}`}
          </DialogContentText>
        ) : (
          <DialogContentText>
            Current path:
            {categoryPath.map(({ title }, index) =>
              index === 0 ? ` ${title}` : ` / ${title}`
            )}
          </DialogContentText>
        )}
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
        <Button onClick={() => formik.handleSubmit()}>
          {editingCategory ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateCategoryDialog;

interface CreateCategoryDialogProps {
  editingCategory: PathCategory | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    variables?: Partial<
      Exact<{ parentId: string; page: number; limit: number }>
    >
  ) => Promise<ApolloQueryResult<GetMaterialCategoriesPaginateQuery>>;
}

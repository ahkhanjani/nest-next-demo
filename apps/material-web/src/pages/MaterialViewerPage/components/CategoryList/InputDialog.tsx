import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
// gql
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from 'graphql/generated';
// types
import { PathCategory } from '../../types';
// store
import { useAppSelector } from 'hooks';

const initialValues: Values = { title: '' };

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Category name must be at least 3 letters.')
    .required('Title is required.'),
});

const InputDialog: React.FC<InputDialogProps> = ({
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
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const { path: categoryPath, endId: parentId } = useAppSelector(
    (state) => state.categoryPath
  );

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function handleCreate() {
    try {
      const res = await createCategory({
        variables: {
          title: formik.values.title,
          parentId,
        },
      });

      if (res.errors?.length) {
        console.error(res.errors);
        return;
      }
      handleClose();
      await refetch();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    if (!editingCategory) {
      console.error('Category is undefined.');
      return;
    }

    try {
      const res = await updateCategory({
        variables: {
          id: editingCategory.id,
          title: formik.values.title,
        },
      });

      if (res.errors?.length) {
        console.error(res.errors);
        return;
      }

      await refetch();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    setIsOpen(false);
    formik.resetForm();
  }

  function handleSubmit() {
    if (editingCategory) handleUpdate();
    else handleCreate();
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
          margin='dense'
          id='title'
          name='title'
          label='Category Title'
          type='text'
          fullWidth
          variant='standard'
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
export default InputDialog;

interface InputDialogProps {
  editingCategory: PathCategory | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: any;
}

interface Values {
  title: string;
}

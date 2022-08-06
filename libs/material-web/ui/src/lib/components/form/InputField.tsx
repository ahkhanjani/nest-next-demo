import { useField } from 'formik';
import TextField from '@mui/material/TextField';

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
}) => {
  const [field, { touched, error }] = useField({
    name,
    type,
  });

  return (
    <TextField
      {...field}
      id={name}
      type={type}
      label={label}
      autoComplete={name}
      error={touched && Boolean(error)}
      helperText={touched && error}
      autoFocus
      fullWidth
      margin="dense"
      variant="filled"
      sx={{ mb: 3 }}
    />
  );
};
export default InputField;

interface InputFieldProps {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
}

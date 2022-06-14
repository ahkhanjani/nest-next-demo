import { useField } from 'formik';
// mui
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, label }) => {
  const [field] = useField({
    name,
  });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={field.value} />}
        id={name}
        {...{ label }}
        {...field}
      />
    </FormGroup>
  );
};
export default CheckboxField;

interface CheckboxFieldProps {
  name: string;
  label: string;
}

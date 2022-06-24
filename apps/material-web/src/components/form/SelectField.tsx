import { useField } from 'formik';
// mui
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

const SelectField: React.FC<SelectFieldProps> = ({ name, label, data }) => {
  const [field, { touched, error }] = useField({ name });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        {...{ label }}
        {...field}
        error={touched && Boolean(error)}
      >
        {data &&
          data.map((value, index) => (
            <MenuItem key={`${name}-item-${index}`} value={value}>
              {value}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );
};
export default SelectField;

interface SelectFieldProps {
  name: string;
  label: string;
  data: string[];
}

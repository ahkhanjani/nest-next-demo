import { useId, useState } from 'react';
// mui
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
// service
import { useMaterialCategoryService } from '../services/MaterialCategoryServiceProvider';

const CategorySelectField: React.FC<CategorySelectFieldProps> = ({
  fieldIndex,
  idArray,
  setIdArray,
}) => {
  // ─── Service ────────────────────────────────────────────────────────────────────

  const { data, error, loading } = useMaterialCategoryService();

  // ─── State ──────────────────────────────────────────────────────────────────────

  const [selectedValue, setSelectedValue] = useState<string>('');

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  function handleChange(value: string) {
    setSelectedValue(value);

    // save changes to the id array
    const currentIds: string[] = idArray.slice(0, fieldIndex + 1);
    if (value !== '') currentIds.push(value);
    setIdArray(currentIds);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  const domId = useId();

  if (loading) return <Skeleton variant="rectangular" />;

  if (data?.materialCategoriesByParentId.length === 0) return null;

  const labelText = `Category ${fieldIndex + 1}`;

  return (
    <FormControl sx={{ mb: 2 }}>
      <InputLabel id={`select-label-${fieldIndex}`}>{labelText}</InputLabel>
      <Select
        labelId={`select-label-${fieldIndex}`}
        label={labelText}
        onChange={({ target: { value } }: SelectChangeEvent<string>) => {
          handleChange(value);
        }}
        error={Boolean(error)}
        value={selectedValue}
      >
        <MenuItem value="">
          <em>Not Selected</em>
        </MenuItem>
        {data?.materialCategoriesByParentId.map(({ id, title }) => (
          <MenuItem key={`${domId}-${id}`} value={id}>
            {title}
          </MenuItem>
        ))}
      </Select>
      {error ? <FormHelperText>{error.message}</FormHelperText> : undefined}
    </FormControl>
  );
};
export default CategorySelectField;

interface CategorySelectFieldProps {
  fieldIndex: number;
  idArray: string[];
  setIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

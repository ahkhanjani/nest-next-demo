import { useEffect, useState } from 'react';
// mui
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
// gql
import { useGetMaterialCategoriesByParentIdQuery } from '@fm/gql';

const CategorySelectField: React.FC<CategorySelectFieldProps> = ({
  parentId,
  fieldIndex,
  handleSetCategoryId,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [value, setValue] = useState<string>('');

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialCategoriesByParentId: materialCategories } = {},
    loading: materialCategoriesLoading,
    error: materialCategoriesError,
  } = useGetMaterialCategoriesByParentIdQuery({
    variables: { parentId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (materialCategoriesError) console.error('Error loading categories.');
  }, [materialCategoriesError]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleChange(id: string) {
    setValue(id);
    handleSetCategoryId(id, fieldIndex);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  if (materialCategoriesLoading || !materialCategories)
    return <Skeleton variant="rectangular" />;

  if (materialCategories.length === 0) return <></>;

  const labelText = `Category ${fieldIndex + 1}`;

  return (
    <FormControl>
      <InputLabel id={`select-label-${fieldIndex}`}>{labelText}</InputLabel>
      <Select
        labelId={`select-label-${fieldIndex}`}
        label={labelText}
        onChange={({ target: { value: id } }: SelectChangeEvent<string>) => {
          handleChange(id);
        }}
        error={Boolean(materialCategoriesError)}
        {...{ value }}
      >
        {materialCategories.map(({ id, title }) => (
          <MenuItem key={id} value={id}>
            {title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {materialCategoriesError?.message.toString()}
      </FormHelperText>
    </FormControl>
  );
};
export default CategorySelectField;

interface CategorySelectFieldProps {
  fieldIndex: number;
  parentId: string;
  handleSetCategoryId: (id: string, index: number) => void;
}

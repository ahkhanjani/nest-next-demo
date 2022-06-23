import { useEffect, useId, useState } from 'react';
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
  idArray,
  setIdArray,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [selectedValue, setSelectedValue] = useState<string>('');

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

  // handle fetch error
  useEffect(() => {
    if (materialCategoriesError) console.error('Error loading categories.');
  }, [materialCategoriesError]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleChange(value: string) {
    setSelectedValue(value);

    // save changes to the id array
    const currentIds: string[] = idArray.slice(0, fieldIndex + 1);
    if (value !== '') currentIds.push(value);
    setIdArray(currentIds);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  const domId = useId();

  if (materialCategoriesLoading || !materialCategories)
    return <Skeleton variant="rectangular" />;

  if (materialCategories.length === 0) return undefined;

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
        error={Boolean(materialCategoriesError)}
        value={selectedValue}
      >
        <MenuItem value="">
          <em>Not Selected</em>
        </MenuItem>
        {materialCategories.map(({ id, title }, index) => (
          <MenuItem key={`${domId}-${id}-${index}`} value={id}>
            {title}
          </MenuItem>
        ))}
      </Select>
      {materialCategoriesError ? (
        <FormHelperText>
          {materialCategoriesError.message.toString()}
        </FormHelperText>
      ) : undefined}
    </FormControl>
  );
};
export default CategorySelectField;

interface CategorySelectFieldProps {
  fieldIndex: number;
  parentId: string;
  idArray: string[];
  setIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

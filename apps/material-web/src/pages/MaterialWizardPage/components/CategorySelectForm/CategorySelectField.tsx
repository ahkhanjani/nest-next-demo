import React, { useEffect, useState } from 'react';
// mui
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
// gql
import { useGetCategoriesByParentIdQuery } from 'graphql/generated';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

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
    data: { categoriesByParentId: categories } = {},
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesByParentIdQuery({
    variables: { parentId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (categoriesError) console.error('Error loading categories.');
  }, [categoriesError]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleChange(id: string) {
    setValue(id);
    handleSetCategoryId(id, fieldIndex);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  if (categoriesLoading || !categories)
    return <Skeleton variant='rectangular' />;

  if (categories.length === 0) return <></>;

  const labelText: string = `Category ${fieldIndex + 1}`;

  return (
    <FormControl>
      <InputLabel id={`select-label-${fieldIndex}`}>{labelText}</InputLabel>
      <Select
        labelId={`select-label-${fieldIndex}`}
        label={labelText}
        onChange={({ target: { value: id } }: SelectChangeEvent<string>) => {
          handleChange(id);
        }}
        error={Boolean(categoriesError)}
        {...{ value }}
      >
        {categories.map(({ id, title }) => (
          <MenuItem key={id} value={id}>
            {title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{categoriesError?.message.toString()}</FormHelperText>
    </FormControl>
  );
};
export default CategorySelectField;

interface CategorySelectFieldProps {
  fieldIndex: number;
  parentId: string;
  handleSetCategoryId: (id: string, index: number) => void;
}

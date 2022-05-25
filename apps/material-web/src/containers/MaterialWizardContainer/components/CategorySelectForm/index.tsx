import { useState, useCallback } from 'react';
// mui
import Paper from '@mui/material/Paper';
// cmp
import CategorySelectField from './CategorySelectField';

const CategorySelectForm: React.FC<CategorySelectFormProps> = () => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [categoryIds, setCategoryIds] = useState<string[]>(['']);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Handles setting category ids array, from inside a select field.
   * @param {string} id The id of the selected category.
   * @param {number} index The index of the select field.
   */
  const handleSetCategoryId = useCallback(
    (id: string, index: number) => {
      const currentIds: string[] = categoryIds.slice(0, index + 1);
      currentIds[index + 1] = id;
      setCategoryIds(currentIds);
    },
    [categoryIds]
  );

  // ────────────────────────────────────────────────────────────────────────────────

  const selectFields = (
    <>
      {categoryIds.map((id, index) => (
        <CategorySelectField
          key={id}
          parentId={id}
          fieldIndex={index}
          {...{ handleSetCategoryId }}
        />
      ))}
    </>
  );

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      {selectFields}
    </Paper>
  );
};
export default CategorySelectForm;

interface CategorySelectFormProps {}

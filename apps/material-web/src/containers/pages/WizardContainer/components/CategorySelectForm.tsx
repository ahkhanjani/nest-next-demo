import { useCallback } from 'react';
// cmp
import CategorySelectField from './CategorySelectField';

const CategorySelectForm: React.FC<CategorySelectFormProps> = ({
  idArray: categoryIdArray,
  setIdArray: setCategoryIdArray,
}) => {
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
      const currentIds: string[] = categoryIdArray.slice(0, index + 1);
      currentIds[index + 1] = id;
      setCategoryIdArray(currentIds);
    },
    [categoryIdArray, setCategoryIdArray]
  );

  // ────────────────────────────────────────────────────────────────────────────────

  const selectFields = (
    <>
      {categoryIdArray.map((id, index) => (
        <CategorySelectField
          key={id}
          parentId={id}
          fieldIndex={index}
          {...{ handleSetCategoryId }}
        />
      ))}
    </>
  );

  return <> {selectFields}</>;
};
export default CategorySelectForm;

interface CategorySelectFormProps {
  idArray: string[];
  setIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

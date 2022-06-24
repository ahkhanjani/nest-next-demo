import { useEffect, useId, useMemo } from 'react';
// cmp
import CategorySelectField from './CategorySelectField';

const CategorySelectForm: React.FC<CategorySelectFormProps> = ({
  idArray,
  setIdArray,
}) => {
  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (idArray.length === 0) setIdArray(['*']);
  }, [idArray, setIdArray]);

  // ────────────────────────────────────────────────────────────────────────────────

  const domId = useId();

  return useMemo(
    () => (
      <>
        {idArray.map((id, index) => (
          <CategorySelectField
            key={`${domId}-${id}-${index}`}
            parentId={id}
            fieldIndex={index}
            {...{ idArray, setIdArray }}
          />
        ))}
      </>
    ),
    [domId, idArray, setIdArray]
  );
};
export default CategorySelectForm;

interface CategorySelectFormProps {
  idArray: string[];
  setIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

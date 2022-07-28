import { useEffect, useId } from 'react';
import { MaterialCategoryServiceProvider } from '../services/MaterialCategoryServiceProvider';
// cmp
import CategorySelectField from './CategorySelectField';

const CategorySelectForm: React.FC<CategorySelectFormProps> = ({
  idArray,
  setIdArray,
}) => {
  useEffect(() => {
    if (idArray.length === 0) setIdArray(['*']);
  }, [idArray, setIdArray]);

  const domId = useId();

  return (
    <>
      {idArray.map((id, index) => (
        <MaterialCategoryServiceProvider parentId={id}>
          <CategorySelectField
            key={domId + id}
            fieldIndex={index}
            {...{ idArray, setIdArray }}
          />
        </MaterialCategoryServiceProvider>
      ))}
    </>
  );
};
export default CategorySelectForm;

interface CategorySelectFormProps {
  idArray: string[];
  setIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

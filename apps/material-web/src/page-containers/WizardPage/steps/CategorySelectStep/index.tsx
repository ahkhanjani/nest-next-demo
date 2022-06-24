// mui
import Paper from '@mui/material/Paper';
// cmp
import CategorySelectForm from '../../components/CategorySelectForm';

const CategorySelectStep: React.FC<CategorySelectStepProps> = ({
  categoryIdArray,
  setCategoryIdArray,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <CategorySelectForm
        idArray={categoryIdArray}
        setIdArray={setCategoryIdArray}
      />
    </Paper>
  );
};
export default CategorySelectStep;

interface CategorySelectStepProps {
  categoryIdArray: string[];
  setCategoryIdArray: React.Dispatch<React.SetStateAction<string[]>>;
}

// mui
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// - icons
import { Add as AddIcon } from '@mui/icons-material';

const CreateCategoryButton: React.FC<CreateButtonProps> = ({
  handleOpenCreateDialog,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleOpenCreateDialog}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="New Category..." />
      </ListItemButton>
    </ListItem>
  );
};
export default CreateCategoryButton;

interface CreateButtonProps {
  handleOpenCreateDialog: () => void;
}

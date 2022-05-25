import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CreateButton: React.FC<CreateButtonProps> = ({
  handleOpenCreateDialog,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleOpenCreateDialog}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary='New Category...' />
      </ListItemButton>
    </ListItem>
  );
};
export default CreateButton;

interface CreateButtonProps {
  handleOpenCreateDialog: () => void;
}

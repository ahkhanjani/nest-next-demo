import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// types
import { Pathnames } from 'types';

const CreateMaterialButton: React.FC = () => {
  const navigate = useNavigate();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleClickCreate() {
    navigate(Pathnames.CREATE_MATERIALS);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickCreate}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='New Material...' />
        </ListItemButton>
      </ListItem>
    </>
  );
};
export default CreateMaterialButton;

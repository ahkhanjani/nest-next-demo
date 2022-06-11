// mui
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// - icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  anchorEl,
  isOpen,
  handleOpenViewDialog,
  handleClose,
}) => {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenViewDialog();
          }}
          disableRipple
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};
export default OptionsMenu;

interface OptionsMenuProps {
  anchorEl: HTMLElement;
  isOpen: boolean;
  handleClose: () => void;
  handleOpenViewDialog: () => void;
}

// mui
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
// cmp
import DeleteButton from './DeleteButton';
import ViewButton from './ViewButton';
// types
import type { RowData } from '../types/row-data';

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  selectedRowData,
  isOpen,
  anchorEl,
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
        <ViewButton {...{ handleClose, selectedRowData }} />
        <DeleteButton selectedRowId={selectedRowData.id} {...{ handleClose }} />
      </Menu>
    </Paper>
  );
};
export default OptionsMenu;

interface OptionsMenuProps {
  selectedRowData: RowData;
  isOpen: boolean;
  anchorEl: HTMLElement;
  handleClose: () => void;
}

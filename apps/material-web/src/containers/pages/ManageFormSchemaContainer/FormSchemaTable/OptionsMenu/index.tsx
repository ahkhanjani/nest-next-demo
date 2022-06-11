// mui
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
// cmp
import DeleteButton from './DeleteButton';
import ViewButton from './ViewButton';
// types
import type { RowData } from '../types/row-data';
import type { RefetchType } from '../types/refetch';

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  selectedRowData,
  isOpen,
  anchorEl,
  handleClose,
  refetch,
}) => {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ViewButton handleCloseMenu={handleClose} {...{ selectedRowData }} />
        <DeleteButton
          selectedRowId={selectedRowData.id}
          {...{ handleClose, refetch }}
        />
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
  refetch: RefetchType;
}

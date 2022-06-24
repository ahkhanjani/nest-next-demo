// mui
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// - icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// cmp
import DrawerContainer from './DrawerContainer';
import DrawerList from './DrawerList';

const Drawer: React.FC<DrawerProps> = ({
  handleToggleDrawer,
  isDrawerOpen,
}) => {
  return (
    <DrawerContainer variant="permanent" open={isDrawerOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={handleToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <DrawerList />
    </DrawerContainer>
  );
};
export default Drawer;

interface DrawerProps {
  isDrawerOpen: boolean;
  handleToggleDrawer: () => void;
}

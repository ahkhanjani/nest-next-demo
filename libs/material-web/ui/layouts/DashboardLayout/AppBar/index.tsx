// mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// - icons
import MenuIcon from '@mui/icons-material/Menu';
// cmp
import AppBarContainer from './AppBarContainer';
import ColorModeToggleButton from './ColorModeToggleButton';

const AppBar: React.FC<AppBarProps> = ({
  handleToggleDrawer,
  isDrawerOpen,
}) => {
  return (
    <AppBarContainer position="absolute" open={isDrawerOpen}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          sx={{
            marginRight: '36px',
            ...(isDrawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Fullmoon Material Dashboard (Beta)
        </Typography>
        {/* divider */}
        <Box sx={{ flexGrow: 1 }} />
        {/* divider */}
        <ColorModeToggleButton />
      </Toolbar>
    </AppBarContainer>
  );
};
export default AppBar;

interface AppBarProps {
  isDrawerOpen: boolean;
  handleToggleDrawer: () => void;
}

import { useState, PropsWithChildren } from 'react';
// mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
// - icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
// cmp
import AppBar from './AppBar';
import Drawer from './Drawer';
import DrawerList from './DrawerList';
import ColorModeToggleButton from './ColorModeToggleButton';

const DashboardContainer: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleToggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={isDrawerOpen}>
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
      </AppBar>

      <Drawer variant="permanent" open={isDrawerOpen}>
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
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <Container sx={{ mt: 4 }}>{children}</Container>
      </Box>
    </Box>
  );
};
export default DashboardContainer;

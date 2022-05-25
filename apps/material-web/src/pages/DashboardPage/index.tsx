import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
// pages
import MaterialViewerPage from '~pages/MaterialViewerPage';
import MaterialWizardPage from '~pages/MaterialWizardPage';
// cmp
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import DrawerList from './components/DrawerList';
// auth
import { AuthContext } from 'auth/AuthProvider';
// types
import { Pathnames } from 'types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //
  // ─── AUTH ───────────────────────────────────────────────────────────────────────
  //

  const context = useContext(AuthContext);

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // check login
  useEffect(() => {
    function checkLogin() {
      // if not logged in, go to login page
      if (context.user === undefined) {
        navigate(Pathnames.LOGIN);
        return;
      }

      // if logged in, open drawer
      setIsDrawerOpen(true);
    }

    checkLogin();
  }, [context.user]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleToggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='absolute' open={isDrawerOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          {context.user && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleToggleDrawer}
              sx={{
                marginRight: '36px',
                ...(isDrawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Fullmoon Material Dashboard (Beta)
          </Typography>
          {!context.user && (
            <IconButton
              color='inherit'
              title='Login'
              onClick={() => navigate('/login')}
            >
              <LoginIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {context.user !== undefined && (
        <Drawer variant='permanent' open={isDrawerOpen}>
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
      )}

      <Box
        component='main'
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

        <Container
          maxWidth='lg'
          sx={{
            pt: 4,
            pb: 4,
          }}
        >
          <Routes>
            <Route
              path={Pathnames.VIEW_MATERIALS}
              element={<MaterialViewerPage />}
            />
            <Route
              path={Pathnames.CREATE_MATERIALS}
              element={<MaterialWizardPage />}
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};
export default DashboardPage;

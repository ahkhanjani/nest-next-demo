import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
// mui
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// - icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// auth
import { AuthContext } from 'fm/auth';
// cmp
import FormContent from './FormContent';
import { FormikValues } from './types/formik';
// routes
import ROUTES from '../../routes';

const formikInitialValues: FormikValues = {
  username: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const router = useRouter();

  //
  // ─── AUTH ───────────────────────────────────────────────────────────────────────
  //

  const { user } = useContext(AuthContext);

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (user) router.push(ROUTES.BROWSE);
  }, [user, router]);

  // ────────────────────────────────────────────────────────────────────────────────

  // if user already exists redirect to dashboard
  if (user) return <p>Redirecting to dashboard...</p>;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            onSubmit={() => {
              console.log('');
            }}
            initialValues={formikInitialValues}
          >
            <FormContent />
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;

import { Formik } from 'formik';
// mui
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// - icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// auth
import { useLoginCheck } from '@fm/auth';
// cmp
import FormContent from './FormContent';
import { FormikValues } from './types/formik';

const formikInitialValues: FormikValues = {
  username: '',
  password: '',
};

const LoginContainer: React.FC = () => {
  //
  // ─── AUTH ───────────────────────────────────────────────────────────────────────
  //

  const [isLoggedIn] = useLoginCheck();

  // ────────────────────────────────────────────────────────────────────────────────

  // if user already exists redirect to dashboard
  // if (isLoggedIn) return <p>Redirecting to dashboard...</p>;

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
export default LoginContainer;

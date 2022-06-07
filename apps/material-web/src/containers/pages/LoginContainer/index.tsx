import { useContext, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
// mui
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// - icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// gql
import { useLoginMutation } from '@fm/gql';
// utils
import { utilToErrorMap } from '@fm/util';
// auth
import { AuthContext } from '../../../auth/AuthProvider';
// routes
import ROUTES from '../../../routes';

const LoginContainer: React.FC = () => {
  const router = useRouter();

  // ____ auth ____
  const context = useContext(AuthContext);

  // ____ gql ____
  const [login] = useLoginMutation();

  const formik = useFormik<FormikValues>({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  // if user already exists redirect to dashboard
  useLayoutEffect(() => {
    if (context.user) router.push(ROUTES.BROWSE);
  }, [context.user, router]);

  async function handleSubmit() {
    // send login request
    const { data, errors } = await login({ variables: formik.values });
    // pass errors to formik
    if (data?.login.errors) {
      formik.setErrors(utilToErrorMap(data.login.errors));
      return;
    }

    // handle errors other than formik
    if (errors) {
      errors.forEach((err) => console.error(err));
      return;
    }

    // set user global context
    const token = data?.login.token;
    if (token) context.login(token);
  }

  // if user already exists redirect to dashboard
  if (context.user) return <p>Redirecting to dashboard...</p>;

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => formik.handleSubmit()}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginContainer;

interface FormikValues {
  username: string;
  password: string;
}

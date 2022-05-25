import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
// gql
import { useLoginMutation } from 'graphql/generated';
// utils
import { toErrorMap } from '~utils/toErrorMap';
// auth
import { AuthContext } from 'auth/AuthProvider';
// types
import { Pathnames } from 'types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
  useEffect(() => {
    if (context.user) navigate(Pathnames.DASHBOARD);
  }, [context.user]);

  async function handleSubmit() {
    // send login request
    const { data, errors } = await login({ variables: formik.values });
    // pass errors to formik
    if (data?.login.errors) {
      formik.setErrors(toErrorMap(data.login.errors));
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
    <Container component='main' maxWidth='xs'>
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
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant='contained'
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
export default LoginPage;

interface FormikValues {
  username: string;
  password: string;
}

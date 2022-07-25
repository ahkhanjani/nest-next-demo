// mui
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// context
import { LoginServiceProvider } from '../services/LoginServiceProvider';
// cmp
import LoginForm from './LoginForm';

export const Auth: React.FC = () => (
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
        <LoginServiceProvider>
          <LoginForm />
        </LoginServiceProvider>
      </Box>
    </Box>
  </Container>
);
export default Auth;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
// providers
import ApolloProvider from '~apollo/ApolloProvider';
import AuthProvider from 'auth/AuthProvider';
// pages
import DashboardPage from '~pages/DashboardPage';
import LoginPage from '~pages/LoginPage';
// types
import { Pathnames } from 'types';
// store
import store from 'store/index';
import { Provider } from 'react-redux';

const mdTheme = createTheme();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider>
        <AuthProvider>
          <ThemeProvider theme={mdTheme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path={Pathnames.LOGIN} element={<LoginPage />} />
                <Route path={Pathnames.DASHBOARD} element={<DashboardPage />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </Provider>
  );
};
export default App;

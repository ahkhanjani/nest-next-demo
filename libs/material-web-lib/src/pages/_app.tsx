import { PropsWithChildren } from 'react';
import Head from 'next/head';
// providers
import { ApolloProvider } from '@fm/network';
import { AuthProvider } from '@fm/auth';
import ThemeProvider from '../providers/ThemeProvider';
import ColorModeProvider from '../providers/ColorModeProvider';
// cmp
import SnackbarAlert from '../components/SnackbarAlert';
// store
import store from '../store';
import { Provider } from 'react-redux';

const AppContainer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Material Client Dev</title>
      </Head>
      <main className="app">
        <Provider store={store}>
          <ApolloProvider>
            <AuthProvider>
              <ColorModeProvider>
                <ThemeProvider>
                  <SnackbarAlert />
                  {children}
                </ThemeProvider>
              </ColorModeProvider>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </main>
    </>
  );
};
export default AppContainer;

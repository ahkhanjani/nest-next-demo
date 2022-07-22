import { AppProps } from 'next/app';
import Head from 'next/head';
// providers
import { ApolloProvider } from '@fm/network';
import { AuthProvider } from '@fm/auth';
import ThemeProvider from '../providers/ThemeProvider';
import ColorModeProvider from '../providers/ColorModeProvider';
// cmp
import SnackbarAlert from '../components/SnackbarAlert';
// store
import { store } from 'fm/material-web-state';
import { Provider as StoreProvider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Material Client Dev</title>
      </Head>
      <main className="app">
        <StoreProvider store={store}>
          <ApolloProvider>
            <AuthProvider>
              <ColorModeProvider>
                <ThemeProvider>
                  <SnackbarAlert />
                  <Component {...pageProps} />
                </ThemeProvider>
              </ColorModeProvider>
            </AuthProvider>
          </ApolloProvider>
        </StoreProvider>
      </main>
    </>
  );
};
export default MyApp;

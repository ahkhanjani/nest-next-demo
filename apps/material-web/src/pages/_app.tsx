import { AppProps } from 'next/app';
import Head from 'next/head';
// mui
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// providers
import ApolloProvider from 'apollo/ApolloProvider';
import AuthProvider from 'auth/AuthProvider';
// store
import store from 'store/index';
import { Provider } from 'react-redux';

const mdTheme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Material Client Dev</title>
      </Head>
      <main className="app">
        <Provider store={store}>
          <ApolloProvider>
            <AuthProvider>
              <ThemeProvider theme={mdTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </main>
    </>
  );
}
export default MyApp;

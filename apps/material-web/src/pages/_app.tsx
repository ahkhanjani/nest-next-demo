import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as StoreProvider } from 'react-redux';
// fm
import { ApolloProvider } from 'fm/material-web-feature-network';
import {
  ThemeProvider,
  ColorModeProvider,
  SnackbarAlert,
} from 'fm/material-web-ui';
import { store } from 'fm/material-web-state';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Material Client Dev</title>
      </Head>
      <main className="app">
        <StoreProvider store={store}>
          <ApolloProvider>
            <ColorModeProvider>
              <ThemeProvider>
                <SnackbarAlert />
                <Component {...pageProps} />
              </ThemeProvider>
            </ColorModeProvider>
          </ApolloProvider>
        </StoreProvider>
      </main>
    </>
  );
};
export default MyApp;

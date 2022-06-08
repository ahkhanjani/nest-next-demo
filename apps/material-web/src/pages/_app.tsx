import { AppProps } from 'next/app';
import Head from 'next/head';
// providers
import { ApolloProvider } from '@fm/network';
import AuthProvider from '../auth/AuthProvider';
import ThemeProvider from '../providers/ThemeProvider';
import ColorModeProvider from '../providers/ColorModeProvider';
// store
import store from '../store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
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
                  <Component {...pageProps} />
                </ThemeProvider>
              </ColorModeProvider>
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </main>
    </>
  );
};
export default MyApp;

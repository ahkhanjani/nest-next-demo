import type { AppProps } from 'next/app';
// providers
import AppContainer from '../page-containers/_app';
// styles
import '@fm/main-web-lib/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}
export default MyApp;

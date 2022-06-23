import type { AppProps } from 'next/app';
// providers
import AppContainer from '@fm/main-web-lib/pages/_app';
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

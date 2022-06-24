import { AppProps } from 'next/app';
// containers
import AppContainer from '../page-containers/_app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
};
export default MyApp;

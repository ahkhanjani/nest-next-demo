import type { AppProps } from 'next/app';
// providers
import { ApolloProvider } from '@fm/network';
// styles
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

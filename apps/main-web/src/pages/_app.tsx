import type { AppProps } from 'next/app';
// providers
import { ApolloProvider } from 'fm/network';
// styles
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

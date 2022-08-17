import type { AppProps } from 'next/app';

import { ApolloProvider } from 'fm/shared-feature-network';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

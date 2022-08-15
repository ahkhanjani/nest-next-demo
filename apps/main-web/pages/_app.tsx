import type { AppProps } from 'next/app';
// providers
import { ApolloProvider } from 'fm/shared-feature-network';
import { DarkModeProvider } from 'fm/main-web-ui';
// styles
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </ApolloProvider>
  );
}
export default MyApp;

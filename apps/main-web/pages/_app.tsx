import type { AppProps } from 'next/app';
// providers
import { ApolloProvider } from 'fm/shared-feature-network';
import { ColorModeProvider } from 'fm/main-web-ui';
// styles
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <ColorModeProvider>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ApolloProvider>
  );
}
export default MyApp;

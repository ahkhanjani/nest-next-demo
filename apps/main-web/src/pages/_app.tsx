import type { AppProps } from 'next/app';
// providers
import MyApolloProvider from '../apollo/ApolloProvider';
// styles
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyApolloProvider>
      <Component {...pageProps} />
    </MyApolloProvider>
  );
}
export default MyApp;

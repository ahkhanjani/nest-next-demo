import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import MyApolloProvider from '~apollo/ApolloProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyApolloProvider>
      <Component {...pageProps} />
    </MyApolloProvider>
  );
}
export default MyApp;

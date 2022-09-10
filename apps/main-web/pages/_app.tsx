import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { ApolloProvider } from 'fm/shared-feature-network';

import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

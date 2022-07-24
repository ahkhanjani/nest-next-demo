import { type PropsWithChildren } from 'react';
import { ApolloProvider as SharedApolloProvider } from 'fm/shared-feature-network';

export const ApolloProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SharedApolloProvider>{children}</SharedApolloProvider>;
};

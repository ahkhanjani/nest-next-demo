import { PropsWithChildren } from 'react';
// providers
import { ApolloProvider } from '@fm/network';

const AppContainer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <ApolloProvider>{children}</ApolloProvider>;
};
export default AppContainer;

import { PropsWithChildren } from 'react';
// providers
import { ApolloProvider } from '@fm/network';
// styles
import '../styles/globals.scss';

const AppContainer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <ApolloProvider>{children}</ApolloProvider>;
};
export default AppContainer;

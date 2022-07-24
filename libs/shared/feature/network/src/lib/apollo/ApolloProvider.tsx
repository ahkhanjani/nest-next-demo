import { PropsWithChildren } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import crossFetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri:
    process.env['NODE_ENV'] === 'production'
      ? process.env['API_URI']
      : 'http://localhost:4000/graphql',
  fetch: crossFetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwtToken');

  // return the headers to the context so httpLink can read them
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : null },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: offsetLimitPagination(),
        },
      },
    },
  }),
});

const MyApolloProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export { MyApolloProvider as ApolloProvider };

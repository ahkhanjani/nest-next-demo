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
import crossFetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri:
    process.env['NODE_ENV'] === 'production'
      ? process.env['API_URI']
      : 'http://localhost:4000/graphql',
  fetch: crossFetch,
  credentials: 'include',
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
  link: from([errorLink, httpLink]),
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

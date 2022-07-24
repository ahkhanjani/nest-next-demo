import { createContext, PropsWithChildren, useContext } from 'react';
import type { ApolloError } from '@apollo/client';
// fm
import { useGetMaterialQuery, type GetMaterialQuery } from 'fm/shared-graphql';

export const MaterialServiceContext =
  createContext<MaterialServiceContextValue>({} as MaterialServiceContextValue);

export const MaterialServiceProvider: React.FC<
  PropsWithChildren<MaterialServiceProviderProps>
> = ({ id, children }) => {
  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const { data, loading, error } = useGetMaterialQuery({
    variables: { id },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MaterialServiceContext.Provider value={{ data, error, loading }}>
      {children}
    </MaterialServiceContext.Provider>
  );
};

export const useMaterialService = () => useContext(MaterialServiceContext);

interface MaterialServiceContextValue {
  data: GetMaterialQuery | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

interface MaterialServiceProviderProps {
  id: string;
}

import { createContext, PropsWithChildren, useContext } from 'react';
import type { ApolloError } from '@apollo/client';
// fm
import {
  GetMaterialCategoriesByParentIdQuery,
  useGetMaterialCategoriesByParentIdQuery,
} from 'fm/shared-graphql';

export const MaterialCategoryServiceContext =
  createContext<MaterialCategoryServiceContextValue>(
    {} as MaterialCategoryServiceContextValue,
  );

export const MaterialCategoryServiceProvider: React.FC<
  PropsWithChildren<MaterialCategoryServiceProviderProps>
> = ({ parentId, children }) => {
  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const { data, loading, error } = useGetMaterialCategoriesByParentIdQuery({
    variables: { parentId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MaterialCategoryServiceContext.Provider value={{ data, error, loading }}>
      {children}
    </MaterialCategoryServiceContext.Provider>
  );
};

export const useMaterialCategoryService = () =>
  useContext(MaterialCategoryServiceContext);

export interface MaterialCategoryServiceContextValue {
  data: GetMaterialCategoriesByParentIdQuery | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
}

interface MaterialCategoryServiceProviderProps {
  parentId: string;
}

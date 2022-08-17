import { createContext, PropsWithChildren, useContext } from 'react';
import type { ApolloError, ApolloQueryResult } from '@apollo/client';
// fm
import {
  Exact,
  GetMaterialsPaginateQuery,
  useGetMaterialsPaginateQuery,
} from 'fm/shared-graphql';
// constants
import { PAGINATION_LIMIT } from '../../../constants';
// store
import { useAppSelector } from 'fm/material-web-state';

export const MaterialListServiceContext =
  createContext<MaterialListServiceContextValue>(
    {} as MaterialListServiceContextValue,
  );

export const MaterialListServiceProvider: React.FC<
  PropsWithChildren<MaterialListServiceProviderProps>
> = ({ page, children }) => {
  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { lastId: categoryId } = useAppSelector((state) => state.categoryPath);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const { data, error, loading, refetch } = useGetMaterialsPaginateQuery({
    variables: { categoryId, limit: PAGINATION_LIMIT, page },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MaterialListServiceContext.Provider
      value={{ data, error, loading, refetch }}
    >
      {children}
    </MaterialListServiceContext.Provider>
  );
};

export const useMaterialListService = () =>
  useContext(MaterialListServiceContext);

export interface MaterialListServiceContextValue {
  data: GetMaterialsPaginateQuery | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            parentId: string;
            page: number;
            limit: number;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<GetMaterialsPaginateQuery>>;
}

interface MaterialListServiceProviderProps {
  page: number;
}

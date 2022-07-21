import { createContext, PropsWithChildren, useContext } from 'react';
// fm
import {
  Exact,
  GetMaterialCategoriesPaginateQuery,
  useGetMaterialCategoriesPaginateQuery,
} from '@fm/gql';
// constants
import { PAGINATION_LIMIT } from '../../../constants';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useAppSelector } from 'fm/material-web-state';

export const CategoryListServiceContext =
  createContext<CategoryListServiceContextValue>(
    {} as CategoryListServiceContextValue
  );

export const CategoryListServiceProvider: React.FC<
  PropsWithChildren<CategoryListServiceProviderProps>
> = ({ page, children }) => {
  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { endId: parentId } = useAppSelector((state) => state.categoryPath);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const { data, error, loading, refetch } =
    useGetMaterialCategoriesPaginateQuery({
      variables: { parentId, limit: PAGINATION_LIMIT, page },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <CategoryListServiceContext.Provider
      value={{ data, error, loading, refetch }}
    >
      {children}
    </CategoryListServiceContext.Provider>
  );
};

export const useCategoryListService = () =>
  useContext(CategoryListServiceContext);

export interface CategoryListServiceContextValue {
  data: GetMaterialCategoriesPaginateQuery | null | undefined;
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
      | undefined
  ) => Promise<ApolloQueryResult<GetMaterialCategoriesPaginateQuery>>;
}

interface CategoryListServiceProviderProps {
  page: number;
}

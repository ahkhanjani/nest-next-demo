import { Exact, GetMaterialFormSchemasTableQuery } from '@fm/gql';
import { ApolloQueryResult } from '@apollo/client';

export type RefetchType = (
  variables?: Partial<
    Exact<{
      [key: string]: never;
    }>
  >
) => Promise<ApolloQueryResult<GetMaterialFormSchemasTableQuery>>;

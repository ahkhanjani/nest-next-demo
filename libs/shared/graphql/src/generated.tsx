import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateMaterialCategoryInput = {
  parentId?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CreateMaterialCategoryResponse = {
  __typename?: 'CreateMaterialCategoryResponse';
  materialCategory?: Maybe<MaterialCategory>;
  message?: Maybe<Scalars['String']>;
};

export type CreateMaterialsInput = {
  category: Array<Scalars['ID']>;
  materialDtoArray: Array<MaterialDto>;
};

export type CreateMaterialsResponse = {
  __typename?: 'CreateMaterialsResponse';
  createdMaterials: Array<Material>;
  errors: Array<Scalars['String']>;
  failedMaterials: Array<FailedMaterialResponse>;
};

export type CreatePreRegInput = {
  email: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type FailedMaterialResponse = {
  __typename?: 'FailedMaterialResponse';
  materialTitle: Scalars['String'];
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Material = {
  __typename?: 'Material';
  category: Array<Scalars['ID']>;
  createdAt: Scalars['DateTime'];
  formData: Scalars['String'];
  id: Scalars['ID'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type MaterialCategoriesPaginateInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  parentId?: InputMaybe<Scalars['ID']>;
};

export type MaterialCategoriesPaginateResponse = {
  __typename?: 'MaterialCategoriesPaginateResponse';
  materialCategories: Array<MaterialCategory>;
  pagesCount: Scalars['Int'];
};

export type MaterialCategory = {
  __typename?: 'MaterialCategory';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type MaterialDto = {
  formData: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type MaterialsPaginateInput = {
  categoryId: Scalars['ID'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type MaterialsPaginateResponse = {
  __typename?: 'MaterialsPaginateResponse';
  materials: Array<Material>;
  pagesCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMaterialCategory: CreateMaterialCategoryResponse;
  createMaterials: CreateMaterialsResponse;
  createPreReg: PreRegResponse;
  createUser: CreateUserResponse;
  login: LoginResponse;
  updateMaterial: UpdateMaterialResponse;
  updateMaterialCategory: UpdateMaterialCategoryResponse;
};

export type MutationCreateMaterialCategoryArgs = {
  dto: CreateMaterialCategoryInput;
};

export type MutationCreateMaterialsArgs = {
  dto: CreateMaterialsInput;
};

export type MutationCreatePreRegArgs = {
  input: CreatePreRegInput;
};

export type MutationCreateUserArgs = {
  dto: CreateUserInput;
};

export type MutationLoginArgs = {
  dto: LoginInput;
};

export type MutationUpdateMaterialArgs = {
  dto: UpdateMaterialInput;
};

export type MutationUpdateMaterialCategoryArgs = {
  dto: UpdateMaterialCategoryInput;
};

export type PreRegEmail = {
  __typename?: 'PreRegEmail';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type PreRegResponse = {
  __typename?: 'PreRegResponse';
  email?: Maybe<PreRegEmail>;
  errors?: Maybe<Array<FieldError>>;
};

export type Query = {
  __typename?: 'Query';
  material: Material;
  materialByTitle: Array<Material>;
  materialCategories: Array<MaterialCategory>;
  materialCategoriesByParentId: Array<MaterialCategory>;
  materialCategoriesPaginate: MaterialCategoriesPaginateResponse;
  materialCategory: MaterialCategory;
  materialTitleExists: Scalars['Boolean'];
  materials: Array<Material>;
  materialsByCategoryId: Array<Material>;
  materialsPaginate: MaterialsPaginateResponse;
  user: User;
  userCount: Scalars['Float'];
  users: Array<User>;
};

export type QueryMaterialArgs = {
  id: Scalars['ID'];
};

export type QueryMaterialByTitleArgs = {
  title: Scalars['String'];
};

export type QueryMaterialCategoriesByParentIdArgs = {
  parentId?: InputMaybe<Scalars['ID']>;
};

export type QueryMaterialCategoriesPaginateArgs = {
  dto: MaterialCategoriesPaginateInput;
};

export type QueryMaterialCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryMaterialTitleExistsArgs = {
  title: Scalars['String'];
};

export type QueryMaterialsByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};

export type QueryMaterialsPaginateArgs = {
  dto: MaterialsPaginateInput;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  preRegCreated: PreRegEmail;
};

export type UpdateMaterialCategoryInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdateMaterialCategoryResponse = {
  __typename?: 'UpdateMaterialCategoryResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateMaterialInput = {
  category: Array<Scalars['ID']>;
  formData: Scalars['String'];
  materialId: Scalars['ID'];
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateMaterialResponse = {
  __typename?: 'UpdateMaterialResponse';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    accessToken?: string | null;
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
  };
};

export type CreateMaterialCategoryMutationVariables = Exact<{
  title: Scalars['String'];
  parentId: Scalars['ID'];
}>;

export type CreateMaterialCategoryMutation = {
  __typename?: 'Mutation';
  createMaterialCategory: {
    __typename?: 'CreateMaterialCategoryResponse';
    message?: string | null;
    materialCategory?: {
      __typename?: 'MaterialCategory';
      id: string;
      title: string;
      parentId?: string | null;
    } | null;
  };
};

export type UpdateMaterialCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;

export type UpdateMaterialCategoryMutation = {
  __typename?: 'Mutation';
  updateMaterialCategory: {
    __typename?: 'UpdateMaterialCategoryResponse';
    success: boolean;
    error?: string | null;
  };
};

export type GetMaterialCategoriesByParentIdQueryVariables = Exact<{
  parentId: Scalars['ID'];
}>;

export type GetMaterialCategoriesByParentIdQuery = {
  __typename?: 'Query';
  materialCategoriesByParentId: Array<{
    __typename?: 'MaterialCategory';
    id: string;
    title: string;
  }>;
};

export type GetMaterialCategoriesPaginateQueryVariables = Exact<{
  parentId: Scalars['ID'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;

export type GetMaterialCategoriesPaginateQuery = {
  __typename?: 'Query';
  materialCategoriesPaginate: {
    __typename?: 'MaterialCategoriesPaginateResponse';
    pagesCount: number;
    materialCategories: Array<{
      __typename?: 'MaterialCategory';
      id: string;
      title: string;
    }>;
  };
};

export type GetMaterialCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMaterialCategoriesQuery = {
  __typename?: 'Query';
  materialCategories: Array<{
    __typename?: 'MaterialCategory';
    id: string;
    title: string;
    parentId?: string | null;
  }>;
};

export type GetMaterialCategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetMaterialCategoryQuery = {
  __typename?: 'Query';
  materialCategory: {
    __typename?: 'MaterialCategory';
    title: string;
    parentId?: string | null;
  };
};

export type CreateMaterialsMutationVariables = Exact<{
  materialDtoArray: Array<MaterialDto> | MaterialDto;
  category: Array<Scalars['ID']> | Scalars['ID'];
}>;

export type CreateMaterialsMutation = {
  __typename?: 'Mutation';
  createMaterials: {
    __typename?: 'CreateMaterialsResponse';
    errors: Array<string>;
    createdMaterials: Array<{
      __typename?: 'Material';
      id: string;
      title: string;
    }>;
    failedMaterials: Array<{
      __typename?: 'FailedMaterialResponse';
      materialTitle: string;
    }>;
  };
};

export type UpdateMaterialMutationVariables = Exact<{
  materialId: Scalars['ID'];
  category: Array<Scalars['ID']> | Scalars['ID'];
  title: Scalars['String'];
  type: Scalars['String'];
  formData: Scalars['String'];
  status: Scalars['String'];
}>;

export type UpdateMaterialMutation = {
  __typename?: 'Mutation';
  updateMaterial: { __typename?: 'UpdateMaterialResponse'; message: string };
};

export type CheckMaterialTitleExistsQueryVariables = Exact<{
  title: Scalars['String'];
}>;

export type CheckMaterialTitleExistsQuery = {
  __typename?: 'Query';
  materialTitleExists: boolean;
};

export type GetMaterialByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;

export type GetMaterialByTitleQuery = {
  __typename?: 'Query';
  materialByTitle: Array<{ __typename?: 'Material'; id: string }>;
};

export type GetMaterialQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetMaterialQuery = {
  __typename?: 'Query';
  material: {
    __typename?: 'Material';
    type: string;
    title: string;
    category: Array<string>;
    formData: string;
  };
};

export type GetMaterialsByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;

export type GetMaterialsByCategoryIdQuery = {
  __typename?: 'Query';
  materialsByCategoryId: Array<{
    __typename?: 'Material';
    id: string;
    title: string;
  }>;
};

export type GetMaterialsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMaterialsQuery = {
  __typename?: 'Query';
  materials: Array<{
    __typename?: 'Material';
    id: string;
    status: string;
    type: string;
    category: Array<string>;
    formData: string;
  }>;
};

export type GetMaterialsPaginateQueryVariables = Exact<{
  categoryId: Scalars['ID'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;

export type GetMaterialsPaginateQuery = {
  __typename?: 'Query';
  materialsPaginate: {
    __typename?: 'MaterialsPaginateResponse';
    pagesCount: number;
    materials: Array<{ __typename?: 'Material'; id: string; title: string }>;
  };
};

export type CreatePreRegMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type CreatePreRegMutation = {
  __typename?: 'Mutation';
  createPreReg: {
    __typename?: 'PreRegResponse';
    email?: { __typename?: 'PreRegEmail'; id: string } | null;
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'CreateUserResponse';
    success: boolean;
    errors?: Array<{
      __typename?: 'FieldError';
      field: string;
      message: string;
    }> | null;
  };
};

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(dto: { username: $username, password: $password }) {
      accessToken
      errors {
        field
        message
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateMaterialCategoryDocument = gql`
  mutation CreateMaterialCategory($title: String!, $parentId: ID!) {
    createMaterialCategory(dto: { title: $title, parentId: $parentId }) {
      materialCategory {
        id
        title
        parentId
      }
      message
    }
  }
`;
export type CreateMaterialCategoryMutationFn = Apollo.MutationFunction<
  CreateMaterialCategoryMutation,
  CreateMaterialCategoryMutationVariables
>;

/**
 * __useCreateMaterialCategoryMutation__
 *
 * To run a mutation, you first call `useCreateMaterialCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMaterialCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMaterialCategoryMutation, { data, loading, error }] = useCreateMaterialCategoryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateMaterialCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMaterialCategoryMutation,
    CreateMaterialCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMaterialCategoryMutation,
    CreateMaterialCategoryMutationVariables
  >(CreateMaterialCategoryDocument, options);
}
export type CreateMaterialCategoryMutationHookResult = ReturnType<
  typeof useCreateMaterialCategoryMutation
>;
export type CreateMaterialCategoryMutationResult =
  Apollo.MutationResult<CreateMaterialCategoryMutation>;
export type CreateMaterialCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateMaterialCategoryMutation,
  CreateMaterialCategoryMutationVariables
>;
export const UpdateMaterialCategoryDocument = gql`
  mutation UpdateMaterialCategory($id: ID!, $title: String!) {
    updateMaterialCategory(dto: { id: $id, title: $title }) {
      success
      error
    }
  }
`;
export type UpdateMaterialCategoryMutationFn = Apollo.MutationFunction<
  UpdateMaterialCategoryMutation,
  UpdateMaterialCategoryMutationVariables
>;

/**
 * __useUpdateMaterialCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateMaterialCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaterialCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaterialCategoryMutation, { data, loading, error }] = useUpdateMaterialCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateMaterialCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMaterialCategoryMutation,
    UpdateMaterialCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMaterialCategoryMutation,
    UpdateMaterialCategoryMutationVariables
  >(UpdateMaterialCategoryDocument, options);
}
export type UpdateMaterialCategoryMutationHookResult = ReturnType<
  typeof useUpdateMaterialCategoryMutation
>;
export type UpdateMaterialCategoryMutationResult =
  Apollo.MutationResult<UpdateMaterialCategoryMutation>;
export type UpdateMaterialCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateMaterialCategoryMutation,
  UpdateMaterialCategoryMutationVariables
>;
export const GetMaterialCategoriesByParentIdDocument = gql`
  query GetMaterialCategoriesByParentId($parentId: ID!) {
    materialCategoriesByParentId(parentId: $parentId) {
      id
      title
    }
  }
`;

/**
 * __useGetMaterialCategoriesByParentIdQuery__
 *
 * To run a query within a React component, call `useGetMaterialCategoriesByParentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialCategoriesByParentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialCategoriesByParentIdQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useGetMaterialCategoriesByParentIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialCategoriesByParentIdQuery,
    GetMaterialCategoriesByParentIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialCategoriesByParentIdQuery,
    GetMaterialCategoriesByParentIdQueryVariables
  >(GetMaterialCategoriesByParentIdDocument, options);
}
export function useGetMaterialCategoriesByParentIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialCategoriesByParentIdQuery,
    GetMaterialCategoriesByParentIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialCategoriesByParentIdQuery,
    GetMaterialCategoriesByParentIdQueryVariables
  >(GetMaterialCategoriesByParentIdDocument, options);
}
export type GetMaterialCategoriesByParentIdQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesByParentIdQuery
>;
export type GetMaterialCategoriesByParentIdLazyQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesByParentIdLazyQuery
>;
export type GetMaterialCategoriesByParentIdQueryResult = Apollo.QueryResult<
  GetMaterialCategoriesByParentIdQuery,
  GetMaterialCategoriesByParentIdQueryVariables
>;
export const GetMaterialCategoriesPaginateDocument = gql`
  query GetMaterialCategoriesPaginate(
    $parentId: ID!
    $page: Int!
    $limit: Int!
  ) {
    materialCategoriesPaginate(
      dto: { parentId: $parentId, page: $page, limit: $limit }
    ) {
      materialCategories {
        id
        title
      }
      pagesCount
    }
  }
`;

/**
 * __useGetMaterialCategoriesPaginateQuery__
 *
 * To run a query within a React component, call `useGetMaterialCategoriesPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialCategoriesPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialCategoriesPaginateQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMaterialCategoriesPaginateQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialCategoriesPaginateQuery,
    GetMaterialCategoriesPaginateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialCategoriesPaginateQuery,
    GetMaterialCategoriesPaginateQueryVariables
  >(GetMaterialCategoriesPaginateDocument, options);
}
export function useGetMaterialCategoriesPaginateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialCategoriesPaginateQuery,
    GetMaterialCategoriesPaginateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialCategoriesPaginateQuery,
    GetMaterialCategoriesPaginateQueryVariables
  >(GetMaterialCategoriesPaginateDocument, options);
}
export type GetMaterialCategoriesPaginateQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesPaginateQuery
>;
export type GetMaterialCategoriesPaginateLazyQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesPaginateLazyQuery
>;
export type GetMaterialCategoriesPaginateQueryResult = Apollo.QueryResult<
  GetMaterialCategoriesPaginateQuery,
  GetMaterialCategoriesPaginateQueryVariables
>;
export const GetMaterialCategoriesDocument = gql`
  query GetMaterialCategories {
    materialCategories {
      id
      title
      parentId
    }
  }
`;

/**
 * __useGetMaterialCategoriesQuery__
 *
 * To run a query within a React component, call `useGetMaterialCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaterialCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMaterialCategoriesQuery,
    GetMaterialCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialCategoriesQuery,
    GetMaterialCategoriesQueryVariables
  >(GetMaterialCategoriesDocument, options);
}
export function useGetMaterialCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialCategoriesQuery,
    GetMaterialCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialCategoriesQuery,
    GetMaterialCategoriesQueryVariables
  >(GetMaterialCategoriesDocument, options);
}
export type GetMaterialCategoriesQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesQuery
>;
export type GetMaterialCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetMaterialCategoriesLazyQuery
>;
export type GetMaterialCategoriesQueryResult = Apollo.QueryResult<
  GetMaterialCategoriesQuery,
  GetMaterialCategoriesQueryVariables
>;
export const GetMaterialCategoryDocument = gql`
  query GetMaterialCategory($id: ID!) {
    materialCategory(id: $id) {
      title
      parentId
    }
  }
`;

/**
 * __useGetMaterialCategoryQuery__
 *
 * To run a query within a React component, call `useGetMaterialCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMaterialCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialCategoryQuery,
    GetMaterialCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialCategoryQuery,
    GetMaterialCategoryQueryVariables
  >(GetMaterialCategoryDocument, options);
}
export function useGetMaterialCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialCategoryQuery,
    GetMaterialCategoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialCategoryQuery,
    GetMaterialCategoryQueryVariables
  >(GetMaterialCategoryDocument, options);
}
export type GetMaterialCategoryQueryHookResult = ReturnType<
  typeof useGetMaterialCategoryQuery
>;
export type GetMaterialCategoryLazyQueryHookResult = ReturnType<
  typeof useGetMaterialCategoryLazyQuery
>;
export type GetMaterialCategoryQueryResult = Apollo.QueryResult<
  GetMaterialCategoryQuery,
  GetMaterialCategoryQueryVariables
>;
export const CreateMaterialsDocument = gql`
  mutation createMaterials(
    $materialDtoArray: [MaterialDto!]!
    $category: [ID!]!
  ) {
    createMaterials(
      dto: { materialDtoArray: $materialDtoArray, category: $category }
    ) {
      createdMaterials {
        id
        title
      }
      failedMaterials {
        materialTitle
      }
      errors
    }
  }
`;
export type CreateMaterialsMutationFn = Apollo.MutationFunction<
  CreateMaterialsMutation,
  CreateMaterialsMutationVariables
>;

/**
 * __useCreateMaterialsMutation__
 *
 * To run a mutation, you first call `useCreateMaterialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMaterialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMaterialsMutation, { data, loading, error }] = useCreateMaterialsMutation({
 *   variables: {
 *      materialDtoArray: // value for 'materialDtoArray'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateMaterialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMaterialsMutation,
    CreateMaterialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMaterialsMutation,
    CreateMaterialsMutationVariables
  >(CreateMaterialsDocument, options);
}
export type CreateMaterialsMutationHookResult = ReturnType<
  typeof useCreateMaterialsMutation
>;
export type CreateMaterialsMutationResult =
  Apollo.MutationResult<CreateMaterialsMutation>;
export type CreateMaterialsMutationOptions = Apollo.BaseMutationOptions<
  CreateMaterialsMutation,
  CreateMaterialsMutationVariables
>;
export const UpdateMaterialDocument = gql`
  mutation UpdateMaterial(
    $materialId: ID!
    $category: [ID!]!
    $title: String!
    $type: String!
    $formData: String!
    $status: String!
  ) {
    updateMaterial(
      dto: {
        materialId: $materialId
        category: $category
        title: $title
        type: $type
        formData: $formData
        status: $status
      }
    ) {
      message
    }
  }
`;
export type UpdateMaterialMutationFn = Apollo.MutationFunction<
  UpdateMaterialMutation,
  UpdateMaterialMutationVariables
>;

/**
 * __useUpdateMaterialMutation__
 *
 * To run a mutation, you first call `useUpdateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaterialMutation, { data, loading, error }] = useUpdateMaterialMutation({
 *   variables: {
 *      materialId: // value for 'materialId'
 *      category: // value for 'category'
 *      title: // value for 'title'
 *      type: // value for 'type'
 *      formData: // value for 'formData'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateMaterialMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMaterialMutation,
    UpdateMaterialMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMaterialMutation,
    UpdateMaterialMutationVariables
  >(UpdateMaterialDocument, options);
}
export type UpdateMaterialMutationHookResult = ReturnType<
  typeof useUpdateMaterialMutation
>;
export type UpdateMaterialMutationResult =
  Apollo.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = Apollo.BaseMutationOptions<
  UpdateMaterialMutation,
  UpdateMaterialMutationVariables
>;
export const CheckMaterialTitleExistsDocument = gql`
  query CheckMaterialTitleExists($title: String!) {
    materialTitleExists(title: $title)
  }
`;

/**
 * __useCheckMaterialTitleExistsQuery__
 *
 * To run a query within a React component, call `useCheckMaterialTitleExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckMaterialTitleExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckMaterialTitleExistsQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCheckMaterialTitleExistsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckMaterialTitleExistsQuery,
    CheckMaterialTitleExistsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CheckMaterialTitleExistsQuery,
    CheckMaterialTitleExistsQueryVariables
  >(CheckMaterialTitleExistsDocument, options);
}
export function useCheckMaterialTitleExistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckMaterialTitleExistsQuery,
    CheckMaterialTitleExistsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CheckMaterialTitleExistsQuery,
    CheckMaterialTitleExistsQueryVariables
  >(CheckMaterialTitleExistsDocument, options);
}
export type CheckMaterialTitleExistsQueryHookResult = ReturnType<
  typeof useCheckMaterialTitleExistsQuery
>;
export type CheckMaterialTitleExistsLazyQueryHookResult = ReturnType<
  typeof useCheckMaterialTitleExistsLazyQuery
>;
export type CheckMaterialTitleExistsQueryResult = Apollo.QueryResult<
  CheckMaterialTitleExistsQuery,
  CheckMaterialTitleExistsQueryVariables
>;
export const GetMaterialByTitleDocument = gql`
  query GetMaterialByTitle($title: String!) {
    materialByTitle(title: $title) {
      id
    }
  }
`;

/**
 * __useGetMaterialByTitleQuery__
 *
 * To run a query within a React component, call `useGetMaterialByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetMaterialByTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialByTitleQuery,
    GetMaterialByTitleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialByTitleQuery,
    GetMaterialByTitleQueryVariables
  >(GetMaterialByTitleDocument, options);
}
export function useGetMaterialByTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialByTitleQuery,
    GetMaterialByTitleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialByTitleQuery,
    GetMaterialByTitleQueryVariables
  >(GetMaterialByTitleDocument, options);
}
export type GetMaterialByTitleQueryHookResult = ReturnType<
  typeof useGetMaterialByTitleQuery
>;
export type GetMaterialByTitleLazyQueryHookResult = ReturnType<
  typeof useGetMaterialByTitleLazyQuery
>;
export type GetMaterialByTitleQueryResult = Apollo.QueryResult<
  GetMaterialByTitleQuery,
  GetMaterialByTitleQueryVariables
>;
export const GetMaterialDocument = gql`
  query GetMaterial($id: ID!) {
    material(id: $id) {
      type
      title
      category
      formData
    }
  }
`;

/**
 * __useGetMaterialQuery__
 *
 * To run a query within a React component, call `useGetMaterialQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMaterialQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialQuery,
    GetMaterialQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMaterialQuery, GetMaterialQueryVariables>(
    GetMaterialDocument,
    options,
  );
}
export function useGetMaterialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialQuery,
    GetMaterialQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMaterialQuery, GetMaterialQueryVariables>(
    GetMaterialDocument,
    options,
  );
}
export type GetMaterialQueryHookResult = ReturnType<typeof useGetMaterialQuery>;
export type GetMaterialLazyQueryHookResult = ReturnType<
  typeof useGetMaterialLazyQuery
>;
export type GetMaterialQueryResult = Apollo.QueryResult<
  GetMaterialQuery,
  GetMaterialQueryVariables
>;
export const GetMaterialsByCategoryIdDocument = gql`
  query GetMaterialsByCategoryId($categoryId: ID!) {
    materialsByCategoryId(categoryId: $categoryId) {
      id
      title
    }
  }
`;

/**
 * __useGetMaterialsByCategoryIdQuery__
 *
 * To run a query within a React component, call `useGetMaterialsByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialsByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialsByCategoryIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetMaterialsByCategoryIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialsByCategoryIdQuery,
    GetMaterialsByCategoryIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialsByCategoryIdQuery,
    GetMaterialsByCategoryIdQueryVariables
  >(GetMaterialsByCategoryIdDocument, options);
}
export function useGetMaterialsByCategoryIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialsByCategoryIdQuery,
    GetMaterialsByCategoryIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialsByCategoryIdQuery,
    GetMaterialsByCategoryIdQueryVariables
  >(GetMaterialsByCategoryIdDocument, options);
}
export type GetMaterialsByCategoryIdQueryHookResult = ReturnType<
  typeof useGetMaterialsByCategoryIdQuery
>;
export type GetMaterialsByCategoryIdLazyQueryHookResult = ReturnType<
  typeof useGetMaterialsByCategoryIdLazyQuery
>;
export type GetMaterialsByCategoryIdQueryResult = Apollo.QueryResult<
  GetMaterialsByCategoryIdQuery,
  GetMaterialsByCategoryIdQueryVariables
>;
export const GetMaterialsDocument = gql`
  query GetMaterials {
    materials {
      id
      status
      type
      category
      formData
    }
  }
`;

/**
 * __useGetMaterialsQuery__
 *
 * To run a query within a React component, call `useGetMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaterialsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMaterialsQuery,
    GetMaterialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(
    GetMaterialsDocument,
    options,
  );
}
export function useGetMaterialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialsQuery,
    GetMaterialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(
    GetMaterialsDocument,
    options,
  );
}
export type GetMaterialsQueryHookResult = ReturnType<
  typeof useGetMaterialsQuery
>;
export type GetMaterialsLazyQueryHookResult = ReturnType<
  typeof useGetMaterialsLazyQuery
>;
export type GetMaterialsQueryResult = Apollo.QueryResult<
  GetMaterialsQuery,
  GetMaterialsQueryVariables
>;
export const GetMaterialsPaginateDocument = gql`
  query GetMaterialsPaginate($categoryId: ID!, $page: Int!, $limit: Int!) {
    materialsPaginate(
      dto: { categoryId: $categoryId, page: $page, limit: $limit }
    ) {
      materials {
        id
        title
      }
      pagesCount
    }
  }
`;

/**
 * __useGetMaterialsPaginateQuery__
 *
 * To run a query within a React component, call `useGetMaterialsPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialsPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialsPaginateQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMaterialsPaginateQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMaterialsPaginateQuery,
    GetMaterialsPaginateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMaterialsPaginateQuery,
    GetMaterialsPaginateQueryVariables
  >(GetMaterialsPaginateDocument, options);
}
export function useGetMaterialsPaginateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMaterialsPaginateQuery,
    GetMaterialsPaginateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMaterialsPaginateQuery,
    GetMaterialsPaginateQueryVariables
  >(GetMaterialsPaginateDocument, options);
}
export type GetMaterialsPaginateQueryHookResult = ReturnType<
  typeof useGetMaterialsPaginateQuery
>;
export type GetMaterialsPaginateLazyQueryHookResult = ReturnType<
  typeof useGetMaterialsPaginateLazyQuery
>;
export type GetMaterialsPaginateQueryResult = Apollo.QueryResult<
  GetMaterialsPaginateQuery,
  GetMaterialsPaginateQueryVariables
>;
export const CreatePreRegDocument = gql`
  mutation CreatePreReg($email: String!) {
    createPreReg(input: { email: $email }) {
      email {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;
export type CreatePreRegMutationFn = Apollo.MutationFunction<
  CreatePreRegMutation,
  CreatePreRegMutationVariables
>;

/**
 * __useCreatePreRegMutation__
 *
 * To run a mutation, you first call `useCreatePreRegMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePreRegMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPreRegMutation, { data, loading, error }] = useCreatePreRegMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreatePreRegMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePreRegMutation,
    CreatePreRegMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePreRegMutation,
    CreatePreRegMutationVariables
  >(CreatePreRegDocument, options);
}
export type CreatePreRegMutationHookResult = ReturnType<
  typeof useCreatePreRegMutation
>;
export type CreatePreRegMutationResult =
  Apollo.MutationResult<CreatePreRegMutation>;
export type CreatePreRegMutationOptions = Apollo.BaseMutationOptions<
  CreatePreRegMutation,
  CreatePreRegMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(dto: { username: $username, password: $password }) {
      success
      errors {
        field
        message
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;

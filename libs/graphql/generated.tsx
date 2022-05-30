import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateCategoryInput = {
  parentId?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CreateMaterialsInput = {
  category: Array<Scalars['ID']>;
  materialDataArray: Array<MaterialDataObject>;
};

export type CreateMaterialsResponse = {
  __typename?: 'CreateMaterialsResponse';
  createdMaterials: Array<CreatedMaterial>;
  message: Scalars['String'];
};

export type CreatePreRegInput = {
  email: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreatedMaterial = {
  __typename?: 'CreatedMaterial';
  createdMaterial: Material;
  materialTitle?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetCategoriesByParentIdInput = {
  parentId?: InputMaybe<Scalars['ID']>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
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

export type MaterialCategory = {
  __typename?: 'MaterialCategory';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type MaterialCategoryResponse = {
  __typename?: 'MaterialCategoryResponse';
  category?: Maybe<MaterialCategory>;
  message?: Maybe<Scalars['String']>;
};

export type MaterialDataObject = {
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
  createCategory: MaterialCategoryResponse;
  createMaterials: CreateMaterialsResponse;
  createPreReg: PreRegResponse;
  createUser: UserResponse;
  login: TokenResponse;
  updateCategory: UpdateMaterialCategoryResponse;
  updateMaterial: UpdateMaterialResponse;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
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
  input: LoginInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateMaterialArgs = {
  dto: UpdateMaterialInput;
};

export type PaginateInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  parentId?: InputMaybe<Scalars['ID']>;
};

export type PaginateResponse = {
  __typename?: 'PaginateResponse';
  categories: Array<MaterialCategory>;
  pagesCount: Scalars['Int'];
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
  allCategories: Array<MaterialCategory>;
  categoriesByParentId: Array<MaterialCategory>;
  categoriesPaginate: PaginateResponse;
  getHello: Scalars['String'];
  material: Material;
  materialSchemaArray: Scalars['String'];
  materialTitleExists: Scalars['Boolean'];
  materials: Array<Material>;
  materialsByCategoryId: Array<Material>;
  materialsPaginate: MaterialsPaginateResponse;
  user: User;
  userCount: Scalars['Float'];
  users: Array<User>;
};


export type QueryCategoriesByParentIdArgs = {
  input: GetCategoriesByParentIdInput;
};


export type QueryCategoriesPaginateArgs = {
  input: PaginateInput;
};


export type QueryMaterialArgs = {
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
  userCreated: User;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
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

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenResponse', token?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateCategoryMutationVariables = Exact<{
  title: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'MaterialCategoryResponse', message?: string | null, category?: { __typename?: 'MaterialCategory', id: string, title: string, parentId?: string | null } | null } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'UpdateMaterialCategoryResponse', success: boolean, error?: string | null } };

export type GetCategoriesPaginateQueryVariables = Exact<{
  parentId: Scalars['ID'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetCategoriesPaginateQuery = { __typename?: 'Query', categoriesPaginate: { __typename?: 'PaginateResponse', pagesCount: number, categories: Array<{ __typename?: 'MaterialCategory', id: string, title: string }> } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'MaterialCategory', id: string, title: string, parentId?: string | null }> };

export type GetCategoriesByParentIdQueryVariables = Exact<{
  parentId: Scalars['ID'];
}>;


export type GetCategoriesByParentIdQuery = { __typename?: 'Query', categoriesByParentId: Array<{ __typename?: 'MaterialCategory', id: string, title: string }> };

export type GetMaterialSchemaArrayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaterialSchemaArrayQuery = { __typename?: 'Query', materialSchemaArray: string };

export type CreateMaterialsMutationVariables = Exact<{
  materialDataArray: Array<MaterialDataObject> | MaterialDataObject;
  category: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type CreateMaterialsMutation = { __typename?: 'Mutation', createMaterials: { __typename?: 'CreateMaterialsResponse', createdMaterials: Array<{ __typename?: 'CreatedMaterial', message?: string | null, createdMaterial: { __typename?: 'Material', id: string, title: string } }> } };

export type UpdateMaterialMutationVariables = Exact<{
  materialId: Scalars['ID'];
  category: Array<Scalars['ID']> | Scalars['ID'];
  title: Scalars['String'];
  type: Scalars['String'];
  formData: Scalars['String'];
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'UpdateMaterialResponse', message: string } };

export type CheckMaterialTitleExistsQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type CheckMaterialTitleExistsQuery = { __typename?: 'Query', materialTitleExists: boolean };

export type GetMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaterialsQuery = { __typename?: 'Query', materials: Array<{ __typename?: 'Material', id: string, status: string, type: string, category: Array<string>, formData: string }> };

export type GetMaterialQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMaterialQuery = { __typename?: 'Query', material: { __typename?: 'Material', type: string, title: string, category: Array<string>, formData: string } };

export type GetMaterialsByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type GetMaterialsByCategoryIdQuery = { __typename?: 'Query', materialsByCategoryId: Array<{ __typename?: 'Material', id: string, title: string }> };

export type GetMaterialsPaginateQueryVariables = Exact<{
  categoryId: Scalars['ID'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetMaterialsPaginateQuery = { __typename?: 'Query', materialsPaginate: { __typename?: 'MaterialsPaginateResponse', pagesCount: number, materials: Array<{ __typename?: 'Material', id: string, title: string }> } };

export type CreatePreRegMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreatePreRegMutation = { __typename?: 'Mutation', createPreReg: { __typename?: 'PreRegResponse', email?: { __typename?: 'PreRegEmail', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    token
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($title: String!, $parentId: ID) {
  createCategory(input: {title: $title, parentId: $parentId}) {
    category {
      id
      title
      parentId
    }
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      title: // value for 'title'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID!, $title: String!) {
  updateCategory(input: {id: $id, title: $title}) {
    success
    error
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetCategoriesPaginateDocument = gql`
    query GetCategoriesPaginate($parentId: ID!, $page: Int!, $limit: Int!) {
  categoriesPaginate(input: {parentId: $parentId, page: $page, limit: $limit}) {
    categories {
      id
      title
    }
    pagesCount
  }
}
    `;

/**
 * __useGetCategoriesPaginateQuery__
 *
 * To run a query within a React component, call `useGetCategoriesPaginateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesPaginateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesPaginateQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCategoriesPaginateQuery(baseOptions: Apollo.QueryHookOptions<GetCategoriesPaginateQuery, GetCategoriesPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesPaginateQuery, GetCategoriesPaginateQueryVariables>(GetCategoriesPaginateDocument, options);
      }
export function useGetCategoriesPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesPaginateQuery, GetCategoriesPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesPaginateQuery, GetCategoriesPaginateQueryVariables>(GetCategoriesPaginateDocument, options);
        }
export type GetCategoriesPaginateQueryHookResult = ReturnType<typeof useGetCategoriesPaginateQuery>;
export type GetCategoriesPaginateLazyQueryHookResult = ReturnType<typeof useGetCategoriesPaginateLazyQuery>;
export type GetCategoriesPaginateQueryResult = Apollo.QueryResult<GetCategoriesPaginateQuery, GetCategoriesPaginateQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  allCategories {
    id
    title
    parentId
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetCategoriesByParentIdDocument = gql`
    query GetCategoriesByParentId($parentId: ID!) {
  categoriesByParentId(input: {parentId: $parentId}) {
    id
    title
  }
}
    `;

/**
 * __useGetCategoriesByParentIdQuery__
 *
 * To run a query within a React component, call `useGetCategoriesByParentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesByParentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesByParentIdQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useGetCategoriesByParentIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoriesByParentIdQuery, GetCategoriesByParentIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesByParentIdQuery, GetCategoriesByParentIdQueryVariables>(GetCategoriesByParentIdDocument, options);
      }
export function useGetCategoriesByParentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesByParentIdQuery, GetCategoriesByParentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesByParentIdQuery, GetCategoriesByParentIdQueryVariables>(GetCategoriesByParentIdDocument, options);
        }
export type GetCategoriesByParentIdQueryHookResult = ReturnType<typeof useGetCategoriesByParentIdQuery>;
export type GetCategoriesByParentIdLazyQueryHookResult = ReturnType<typeof useGetCategoriesByParentIdLazyQuery>;
export type GetCategoriesByParentIdQueryResult = Apollo.QueryResult<GetCategoriesByParentIdQuery, GetCategoriesByParentIdQueryVariables>;
export const GetMaterialSchemaArrayDocument = gql`
    query GetMaterialSchemaArray {
  materialSchemaArray
}
    `;

/**
 * __useGetMaterialSchemaArrayQuery__
 *
 * To run a query within a React component, call `useGetMaterialSchemaArrayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialSchemaArrayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialSchemaArrayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaterialSchemaArrayQuery(baseOptions?: Apollo.QueryHookOptions<GetMaterialSchemaArrayQuery, GetMaterialSchemaArrayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialSchemaArrayQuery, GetMaterialSchemaArrayQueryVariables>(GetMaterialSchemaArrayDocument, options);
      }
export function useGetMaterialSchemaArrayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialSchemaArrayQuery, GetMaterialSchemaArrayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialSchemaArrayQuery, GetMaterialSchemaArrayQueryVariables>(GetMaterialSchemaArrayDocument, options);
        }
export type GetMaterialSchemaArrayQueryHookResult = ReturnType<typeof useGetMaterialSchemaArrayQuery>;
export type GetMaterialSchemaArrayLazyQueryHookResult = ReturnType<typeof useGetMaterialSchemaArrayLazyQuery>;
export type GetMaterialSchemaArrayQueryResult = Apollo.QueryResult<GetMaterialSchemaArrayQuery, GetMaterialSchemaArrayQueryVariables>;
export const CreateMaterialsDocument = gql`
    mutation createMaterials($materialDataArray: [MaterialDataObject!]!, $category: [ID!]!) {
  createMaterials(
    dto: {materialDataArray: $materialDataArray, category: $category}
  ) {
    createdMaterials {
      createdMaterial {
        id
        title
      }
      message
    }
  }
}
    `;
export type CreateMaterialsMutationFn = Apollo.MutationFunction<CreateMaterialsMutation, CreateMaterialsMutationVariables>;

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
 *      materialDataArray: // value for 'materialDataArray'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateMaterialsMutation(baseOptions?: Apollo.MutationHookOptions<CreateMaterialsMutation, CreateMaterialsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMaterialsMutation, CreateMaterialsMutationVariables>(CreateMaterialsDocument, options);
      }
export type CreateMaterialsMutationHookResult = ReturnType<typeof useCreateMaterialsMutation>;
export type CreateMaterialsMutationResult = Apollo.MutationResult<CreateMaterialsMutation>;
export type CreateMaterialsMutationOptions = Apollo.BaseMutationOptions<CreateMaterialsMutation, CreateMaterialsMutationVariables>;
export const UpdateMaterialDocument = gql`
    mutation UpdateMaterial($materialId: ID!, $category: [ID!]!, $title: String!, $type: String!, $formData: String!) {
  updateMaterial(
    dto: {materialId: $materialId, category: $category, title: $title, type: $type, formData: $formData}
  ) {
    message
  }
}
    `;
export type UpdateMaterialMutationFn = Apollo.MutationFunction<UpdateMaterialMutation, UpdateMaterialMutationVariables>;

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
 *   },
 * });
 */
export function useUpdateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(UpdateMaterialDocument, options);
      }
export type UpdateMaterialMutationHookResult = ReturnType<typeof useUpdateMaterialMutation>;
export type UpdateMaterialMutationResult = Apollo.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = Apollo.BaseMutationOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>;
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
export function useCheckMaterialTitleExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckMaterialTitleExistsQuery, CheckMaterialTitleExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckMaterialTitleExistsQuery, CheckMaterialTitleExistsQueryVariables>(CheckMaterialTitleExistsDocument, options);
      }
export function useCheckMaterialTitleExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckMaterialTitleExistsQuery, CheckMaterialTitleExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckMaterialTitleExistsQuery, CheckMaterialTitleExistsQueryVariables>(CheckMaterialTitleExistsDocument, options);
        }
export type CheckMaterialTitleExistsQueryHookResult = ReturnType<typeof useCheckMaterialTitleExistsQuery>;
export type CheckMaterialTitleExistsLazyQueryHookResult = ReturnType<typeof useCheckMaterialTitleExistsLazyQuery>;
export type CheckMaterialTitleExistsQueryResult = Apollo.QueryResult<CheckMaterialTitleExistsQuery, CheckMaterialTitleExistsQueryVariables>;
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
export function useGetMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<GetMaterialsQuery, GetMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(GetMaterialsDocument, options);
      }
export function useGetMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialsQuery, GetMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialsQuery, GetMaterialsQueryVariables>(GetMaterialsDocument, options);
        }
export type GetMaterialsQueryHookResult = ReturnType<typeof useGetMaterialsQuery>;
export type GetMaterialsLazyQueryHookResult = ReturnType<typeof useGetMaterialsLazyQuery>;
export type GetMaterialsQueryResult = Apollo.QueryResult<GetMaterialsQuery, GetMaterialsQueryVariables>;
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
export function useGetMaterialQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialQuery, GetMaterialQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialQuery, GetMaterialQueryVariables>(GetMaterialDocument, options);
      }
export function useGetMaterialLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialQuery, GetMaterialQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialQuery, GetMaterialQueryVariables>(GetMaterialDocument, options);
        }
export type GetMaterialQueryHookResult = ReturnType<typeof useGetMaterialQuery>;
export type GetMaterialLazyQueryHookResult = ReturnType<typeof useGetMaterialLazyQuery>;
export type GetMaterialQueryResult = Apollo.QueryResult<GetMaterialQuery, GetMaterialQueryVariables>;
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
export function useGetMaterialsByCategoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialsByCategoryIdQuery, GetMaterialsByCategoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialsByCategoryIdQuery, GetMaterialsByCategoryIdQueryVariables>(GetMaterialsByCategoryIdDocument, options);
      }
export function useGetMaterialsByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialsByCategoryIdQuery, GetMaterialsByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialsByCategoryIdQuery, GetMaterialsByCategoryIdQueryVariables>(GetMaterialsByCategoryIdDocument, options);
        }
export type GetMaterialsByCategoryIdQueryHookResult = ReturnType<typeof useGetMaterialsByCategoryIdQuery>;
export type GetMaterialsByCategoryIdLazyQueryHookResult = ReturnType<typeof useGetMaterialsByCategoryIdLazyQuery>;
export type GetMaterialsByCategoryIdQueryResult = Apollo.QueryResult<GetMaterialsByCategoryIdQuery, GetMaterialsByCategoryIdQueryVariables>;
export const GetMaterialsPaginateDocument = gql`
    query GetMaterialsPaginate($categoryId: ID!, $page: Int!, $limit: Int!) {
  materialsPaginate(dto: {categoryId: $categoryId, page: $page, limit: $limit}) {
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
export function useGetMaterialsPaginateQuery(baseOptions: Apollo.QueryHookOptions<GetMaterialsPaginateQuery, GetMaterialsPaginateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialsPaginateQuery, GetMaterialsPaginateQueryVariables>(GetMaterialsPaginateDocument, options);
      }
export function useGetMaterialsPaginateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialsPaginateQuery, GetMaterialsPaginateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialsPaginateQuery, GetMaterialsPaginateQueryVariables>(GetMaterialsPaginateDocument, options);
        }
export type GetMaterialsPaginateQueryHookResult = ReturnType<typeof useGetMaterialsPaginateQuery>;
export type GetMaterialsPaginateLazyQueryHookResult = ReturnType<typeof useGetMaterialsPaginateLazyQuery>;
export type GetMaterialsPaginateQueryResult = Apollo.QueryResult<GetMaterialsPaginateQuery, GetMaterialsPaginateQueryVariables>;
export const CreatePreRegDocument = gql`
    mutation CreatePreReg($email: String!) {
  createPreReg(input: {email: $email}) {
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
export type CreatePreRegMutationFn = Apollo.MutationFunction<CreatePreRegMutation, CreatePreRegMutationVariables>;

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
export function useCreatePreRegMutation(baseOptions?: Apollo.MutationHookOptions<CreatePreRegMutation, CreatePreRegMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePreRegMutation, CreatePreRegMutationVariables>(CreatePreRegDocument, options);
      }
export type CreatePreRegMutationHookResult = ReturnType<typeof useCreatePreRegMutation>;
export type CreatePreRegMutationResult = Apollo.MutationResult<CreatePreRegMutation>;
export type CreatePreRegMutationOptions = Apollo.BaseMutationOptions<CreatePreRegMutation, CreatePreRegMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(dto: {username: $username, password: $password}) {
    user {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
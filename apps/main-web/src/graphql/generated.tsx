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

export type CategorySchemaResponse = {
  __typename?: 'CategorySchemaResponse';
  error?: Maybe<Scalars['String']>;
  schema?: Maybe<Scalars['String']>;
};

export type CreateCategoryInput = {
  parentId?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CreateMaterialResponse = {
  __typename?: 'CreateMaterialResponse';
  message: Scalars['String'];
};

export type CreateMaterialsInput = {
  category: Array<Scalars['String']>;
  materialArray: Array<Scalars['String']>;
};

export type CreatePreRegInput = {
  email: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetCategoriesByParentIdInput = {
  parentId?: InputMaybe<Scalars['ID']>;
};

export type GetMaterialsByCategoryIdInput = {
  categoryId: Scalars['ID'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: MaterialCategoryResponse;
  createMaterials: CreateMaterialResponse;
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
  input: CreateMaterialsInput;
};


export type MutationCreatePreRegArgs = {
  input: CreatePreRegInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
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
  allMaterials: Array<Material>;
  categoriesByParentId: Array<MaterialCategory>;
  categorySchema: CategorySchemaResponse;
  getHello: Scalars['String'];
  materialById: Material;
  materialSchemaArray: Scalars['String'];
  materialTitleExists: Scalars['Boolean'];
  materialsByCategoryId: Array<Material>;
  user: UserResponse;
  userCount: Scalars['Float'];
  users: Array<User>;
};


export type QueryCategoriesByParentIdArgs = {
  input: GetCategoriesByParentIdInput;
};


export type QueryMaterialByIdArgs = {
  id: Scalars['String'];
};


export type QueryMaterialTitleExistsArgs = {
  title: Scalars['String'];
};


export type QueryMaterialsByCategoryIdArgs = {
  input: GetMaterialsByCategoryIdInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
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

export type CreatePreRegMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreatePreRegMutation = { __typename?: 'Mutation', createPreReg: { __typename?: 'PreRegResponse', email?: { __typename?: 'PreRegEmail', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


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
  createUser(input: {username: $username, password: $password}) {
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
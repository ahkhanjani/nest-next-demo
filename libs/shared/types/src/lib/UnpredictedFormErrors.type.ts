import type { GraphQLError } from 'graphql';

type UnpredictedFormError = string | Error | GraphQLError;
export type UnpredictedFormErrors = ReadonlyArray<UnpredictedFormError>;

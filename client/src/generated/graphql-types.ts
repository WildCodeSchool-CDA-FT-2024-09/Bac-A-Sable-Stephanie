import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  repo: Repo;
  text: Scalars['String']['output'];
};

export type CommentInput = {
  author: Scalars['String']['input'];
  repoId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
};


export type MutationCreateNewCommentArgs = {
  data: CommentInput;
};

export type Query = {
  __typename?: 'Query';
  alllangs: Array<Lang>;
  fullcomments: Array<Comment>;
  fullrepos: Array<Repo>;
  repobyid: Repo;
  repobylang: Array<Repo>;
};


export type QueryFullreposArgs = {
  langlabel?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRepobyidArgs = {
  id: Scalars['String']['input'];
};


export type QueryRepobylangArgs = {
  langlabel?: InputMaybe<Scalars['String']['input']>;
};

export type Repo = {
  __typename?: 'Repo';
  comments: Array<Comment>;
  id: Scalars['ID']['output'];
  languages: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos: Array<Repo>;
};

export type CreateNewCommentMutationVariables = Exact<{
  data: CommentInput;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', author: string, text: string } };

export type RepobyidQueryVariables = Exact<{
  repobyidId: Scalars['String']['input'];
}>;


export type RepobyidQuery = { __typename?: 'Query', repobyid: { __typename?: 'Repo', id: string, name: string, url: string, languages: Array<{ __typename?: 'Lang', label: string }>, status: { __typename?: 'Status', label: string }, comments: Array<{ __typename?: 'Comment', author: string, text: string, id: number }> } };

export type RepobylangQueryVariables = Exact<{
  langlabel?: InputMaybe<Scalars['String']['input']>;
}>;


export type RepobylangQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, status: { __typename?: 'Status', id: number, label: string }, languages: Array<{ __typename?: 'Lang', label: string, id: number }> }>, alllangs: Array<{ __typename?: 'Lang', label: string, id: number }> };


export const CreateNewCommentDocument = gql`
    mutation CreateNewComment($data: CommentInput!) {
  createNewComment(data: $data) {
    author
    text
  }
}
    `;
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const RepobyidDocument = gql`
    query Repobyid($repobyidId: String!) {
  repobyid(id: $repobyidId) {
    id
    languages {
      label
    }
    name
    url
    status {
      label
    }
    comments {
      author
      text
      id
    }
  }
}
    `;

/**
 * __useRepobyidQuery__
 *
 * To run a query within a React component, call `useRepobyidQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepobyidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepobyidQuery({
 *   variables: {
 *      repobyidId: // value for 'repobyidId'
 *   },
 * });
 */
export function useRepobyidQuery(baseOptions: Apollo.QueryHookOptions<RepobyidQuery, RepobyidQueryVariables> & ({ variables: RepobyidQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepobyidQuery, RepobyidQueryVariables>(RepobyidDocument, options);
      }
export function useRepobyidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepobyidQuery, RepobyidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepobyidQuery, RepobyidQueryVariables>(RepobyidDocument, options);
        }
export function useRepobyidSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RepobyidQuery, RepobyidQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RepobyidQuery, RepobyidQueryVariables>(RepobyidDocument, options);
        }
export type RepobyidQueryHookResult = ReturnType<typeof useRepobyidQuery>;
export type RepobyidLazyQueryHookResult = ReturnType<typeof useRepobyidLazyQuery>;
export type RepobyidSuspenseQueryHookResult = ReturnType<typeof useRepobyidSuspenseQuery>;
export type RepobyidQueryResult = Apollo.QueryResult<RepobyidQuery, RepobyidQueryVariables>;
export const RepobylangDocument = gql`
    query Repobylang($langlabel: String) {
  fullrepos(langlabel: $langlabel) {
    id
    name
    status {
      id
      label
    }
    url
    languages {
      label
      id
    }
  }
  alllangs {
    label
    id
  }
}
    `;

/**
 * __useRepobylangQuery__
 *
 * To run a query within a React component, call `useRepobylangQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepobylangQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepobylangQuery({
 *   variables: {
 *      langlabel: // value for 'langlabel'
 *   },
 * });
 */
export function useRepobylangQuery(baseOptions?: Apollo.QueryHookOptions<RepobylangQuery, RepobylangQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepobylangQuery, RepobylangQueryVariables>(RepobylangDocument, options);
      }
export function useRepobylangLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepobylangQuery, RepobylangQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepobylangQuery, RepobylangQueryVariables>(RepobylangDocument, options);
        }
export function useRepobylangSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RepobylangQuery, RepobylangQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RepobylangQuery, RepobylangQueryVariables>(RepobylangDocument, options);
        }
export type RepobylangQueryHookResult = ReturnType<typeof useRepobylangQuery>;
export type RepobylangLazyQueryHookResult = ReturnType<typeof useRepobylangLazyQuery>;
export type RepobylangSuspenseQueryHookResult = ReturnType<typeof useRepobylangSuspenseQuery>;
export type RepobylangQueryResult = Apollo.QueryResult<RepobylangQuery, RepobylangQueryVariables>;
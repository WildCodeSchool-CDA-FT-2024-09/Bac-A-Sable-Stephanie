import { gql } from "@apollo/client";

export const GET_REPO_DETAILS = gql`
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
export const GET_REPOS = gql`
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

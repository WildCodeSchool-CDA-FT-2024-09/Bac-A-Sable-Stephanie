import { gql } from "@apollo/client";

export const CREATE_NEW_COMMENT = gql`
  mutation CreateNewComment($data: CommentInput!) {
    createNewComment(data: $data) {
      author
      text
    }
  }
`;

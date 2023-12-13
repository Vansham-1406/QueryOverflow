import { gql } from "@apollo/client";

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($answerInput: AnswerInput) {
    createAnswer(answerInput: $answerInput) {
      ... on AnswerSuccess {
        message
        answer {
          userId {
            name
          }
          questionId {
            title
          }
        }
      }
      ... on AnswerFailure {
        message
        args
      }
    }
  }
`;

// export const isUpvote = gql``;

// export const isDownvote = gql``;

export const BookMarkAnswer = gql`
  mutation UpdateBookmarkedAnswer(
    $updateBookmarkedAnswerAnswerId2: ID!
    $updateBookmarkedAnswerUserId2: ID!
  ) {
    updateBookmarkedAnswer(
      answerId: $updateBookmarkedAnswerAnswerId2
      userId: $updateBookmarkedAnswerUserId2
    )
  }
`;

export const isBookMarkAnswer = gql`
  mutation IsBookmarkedAnswer(
    $isBookmarkedAnswerAnswerId2: ID!
    $isBookmarkedAnswerUserId2: ID!
  ) {
    isBookmarkedAnswer(
      answerId: $isBookmarkedAnswerAnswerId2
      userId: $isBookmarkedAnswerUserId2
    )
  }
`;

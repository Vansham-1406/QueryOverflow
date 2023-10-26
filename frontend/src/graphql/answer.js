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

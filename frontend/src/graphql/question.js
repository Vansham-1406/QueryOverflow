import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($inputQuestion: CreateQuestion) {
    createQuestion(inputQuestion: $inputQuestion) {
      ... on QuestionSuccess {
        message
        question {
          userId {
            name
            avatarImage
            question {
              title
              tags {
                TagName
              }
            }
          }
          chatGptAnswer
          answers {
            _id
          }
          tags {
            _id
          }
        }
      }
      ... on QuestionFailure {
        message
        args
      }
    }
  }
`;

export const GET_ALL_QUESTION = gql`
  query GetAllQuestion {
    getAllQuestion {
      _id
      createdAt
      title
      body
      userId {
        name
        avatarImage
      }
      answers {
        _id
      }
      tags {
        _id
        TagName
      }
      upvote {
        _id
      }
      downvote {
        _id
      }
      view {
        _id
      }
    }
  }
`;

export const GET_SINGLE_QUESTION = gql`
  mutation GetSingleQuestion($question: ID!) {
    getSingleQuestion(questionId: $question) {
      ... on QuestionSuccess {
        message
        question {
          title
          createdAt
          body
          code
          image
          tags {
            TagName
          }
          upvote {
            _id
          }
          downvote {
            _id
          }
          view {
            _id
          }
          userId {
            name
            avatarImage
          }
          chatGptOpt
          chatGptAnswer
          answers {
            _id
            createdAt
            body
            code
            image
            userId {
              name
              avatarImage
            }
            upvote {
              _id
            }
            downvote {
              _id
            }
          }
        }
      }
      ... on QuestionFailure {
        message
        args
      }
    }
  }
`;

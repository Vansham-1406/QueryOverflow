import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($inputQuestion: CreateQuestion) {
    createQuestion(inputQuestion: $inputQuestion) {
      ... on QuestionSuccess {
        message
        question {
          title
          createdAt
          _id
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
        _id
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
            _id
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
            _id
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
              _id
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

export const UpvoteQuestion = gql`
  mutation UpvoteQuestion(
    $upvoteQuestionQuestionId2: ID!
    $upvoteQuestionUserId2: ID!
  ) {
    upvoteQuestion(
      questionId: $upvoteQuestionQuestionId2
      userId: $upvoteQuestionUserId2
    )
  }
`;

export const DownvoteQuestion = gql`
  mutation DownvoteQuestion($questionId: ID!, $userId: ID!) {
    downvoteQuestion(questionId: $questionId, userId: $userId)
  }
`;

export const isUpVote = gql`
  mutation Isupvote($isupvoteQuestionId2: ID!, $isupvoteUserId2: ID!) {
    isupvote(questionId: $isupvoteQuestionId2, userId: $isupvoteUserId2)
  }
`;

export const isDownVote = gql`
  mutation Isdownvote($isdownvoteQuestionId2: ID!, $isdownvoteUserId2: ID!) {
    isdownvote(questionId: $isdownvoteQuestionId2, userId: $isdownvoteUserId2)
  }
`;

export const bookmarkQuestion = gql`
  mutation UpdateBookmarkedQuestion(
    $updateBookmarkedQuestionQuestionId2: ID!
    $updateBookmarkedQuestionUserId2: ID!
  ) {
    updateBookmarkedQuestion(
      questionId: $updateBookmarkedQuestionQuestionId2
      userId: $updateBookmarkedQuestionUserId2
    )
  }
`;

export const isbookmark = gql`
  mutation IsBookmarkedQuestion(
    $isBookmarkedQuestionQuestionId2: ID!
    $isBookmarkedQuestionUserId2: ID!
  ) {
    isBookmarkedQuestion(
      questionId: $isBookmarkedQuestionQuestionId2
      userId: $isBookmarkedQuestionUserId2
    )
  }
`;

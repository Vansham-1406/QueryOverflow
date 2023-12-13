import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createInput: CreateInput!) {
    createUser(createInput: $createInput) {
      ... on Success {
        message
        token
      }
      ... on Failure {
        message
        args
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      ... on Success {
        message
        token
      }
      ... on Failure {
        message
        args
      }
    }
  }
`;

export const GEN_OTP = gql`
  mutation GETOTP($mobilenumber: String!) {
    genOtp(mobilenumber: $mobilenumber) {
      ... on ResFailure {
        message
        args
      }

      ... on ResSuccess {
        message
        otp
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatedUser($mobilenumber: String!, $password: String!) {
    updateUser(mobilenumber: $mobilenumber, password: $password) {
      ... on SingleSuccess {
        message
        user {
          _id
        }
      }

      ... on SingleFailure {
        message
        args
      }
    }
  }
`;

export const GET_IMAGE_USER = gql`
  mutation SingleUser($userId: ID!) {
    getSingleUser(_id: $userId) {
      ... on SingleSuccess {
        message
        user {
          avatarImage
          _id
          name
          bookmarkedAnswer {
            _id
          }
        }
      }

      ... on SingleFailure {
        message
        args
      }
    }
  }
`;

export const ALL_USER = gql`
  query GetAllUser {
    getAllUser {
      _id
      name
      avatarImage
      createdAt
    }
  }
`;

export const GET_SINGLE_USER = gql`
  mutation SingleUser($userId: ID!) {
    getSingleUser(_id: $userId) {
      ... on SingleSuccess {
        message
        user {
          avatarImage
          name
          createdAt
          question {
            _id
            title
            createdAt
            upvote {
              _id
            }
            downvote {
              _id
            }
          }
          answer {
            _id
            upvote {
              _id
            }
            downvote {
              _id
            }
            body
            createdAt
          }
          bookmarkedQuestion {
            _id
            title
            createdAt
            upvote {
              _id
            }
            downvote {
              _id
            }
          }
          bookmarkedAnswer {
            _id
            upvote {
              _id
            }
            downvote {
              _id
            }
            body
            createdAt
          }
        }
      }

      ... on SingleFailure {
        message
        args
      }
    }
  }
`;

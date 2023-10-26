import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query GetAllTag {
    getAllTag {
      TagName
      body
      _id
      question {
        _id
      }
    }
  }
`;

export const GET_SINGLE_TAG = gql`
  mutation GetSingleTag($id: ID!) {
    getSingleTag(_id: $id) {
      ... on TagSuccess {
        message
        tag {
          TagName
          body
          _id
          question {
            _id
            title
            body
            createdAt
            userId {
              avatarImage
              name
            }
            upvote {
              _id
            }
            downvote {
              _id
            }
            answers {
              _id
            }
            view {
              _id
            }
            tags {
              _id
              TagName
            }
          }
        }
      }
      ... on TagFailure {
        message
        args
      }
    }
  }
`;

export const GET_TOP_TAGS = gql`
  query GetAllTopTag {
    getAllTopTag {
      _id
      TagName
      question {
        _id
      }
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($TagName: String!) {
    createTag(TagName: $TagName) {
      ... on TagSuccess {
        message
        tag {
          TagName
          body
          _id
          question {
            _id
          }
        }
      }

      ... on TagFailure {
        message
        args
      }
    }
  }
`;

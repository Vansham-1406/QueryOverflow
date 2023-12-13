const {gql} = require("graphql-tag")

module.exports = gql`
    enum AnswerInfo{
        OK,
        CORRECT,
        WRONG
    }
    union AnswerResult = AnswerSuccess | AnswerFailure
    type AnswerSuccess{
        message : String,
        answer : Answer
    }
    type AnswerFailure{
        message : String,
        args : String!
    }
    type Answer{
        _id : ID!
        createdAt : String!,
        updatedAt : String!,
        body : String!,
        code : String,
        image : String,
        userId : User,
        questionId : Question,
        upvote : [User]
        downvote : [User]
        answerInfo : AnswerInfo
    }
    input AnswerInput{
        body : String!,
        code : String,
        image : String,
        userId : ID!,
        questionId : ID!
    }
    extend type Mutation{
        createAnswer(answerInput : AnswerInput) : AnswerResult! @auth
        deleteAnswer(_id : ID!) : Boolean! @auth
        upvoteAnswer(answerId : ID!,userId : ID!) : String! @auth
        downvoteAnswer(answerId : ID!,userId : ID!) : String! @auth
        isupvoteAnswer(answerId : ID!,userId : ID!) : Boolean! @auth
        isdownvoteAnswer(answerId : ID!,userId : ID!) : Boolean! @auth
        updateBookmarkedAnswer(answerId : ID!,userId : ID!) : Boolean! @auth
        isBookmarkedAnswer(answerId : ID!,userId : ID!) : Boolean! @auth
    }
`
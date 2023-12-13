const {gql} = require("graphql-tag")

module.exports = gql`
    type Question{
        _id : ID!,
        createdAt : String,
        updatedAt : String,
        title : String,
        body : String,
        code : String,
        image : String,
        chatGptAnswer : String,
        chatGptOpt : Boolean,
        userId : User!,
        answers : [Answer!]!
        tags : [Tag!]!
        view : [User]
        upvote : [User]
        downvote : [User]
    }
    input CreateQuestion{
        title : String!,
        body : String!,
        code : String,
        image : String,
        chatGptOpt : Boolean,
        userId : ID!,
        tags : [String!]
    }
    input UpdateQuestion{
        title : String!,
        body : String!,
        code : String,
        image : String,
        tags : [String!]
        _id : ID!
    }
    union QuestionResult = QuestionSuccess | QuestionFailure
    type QuestionSuccess{
        message : String!,
        question : Question!
    }
    type QuestionFailure{
        message : String!,
        args : String!
    }
    extend type Query{
        getAllQuestion : [Question!]!
    }
    extend type Mutation{
        createQuestion(inputQuestion : CreateQuestion) : QuestionResult! @auth
        upvoteQuestion(questionId : ID!,userId : ID!) : String! @auth
        downvoteQuestion(questionId : ID!,userId : ID!) : String! @auth
        viewQuestion(questionId : ID!,userId : ID!) : String! @auth
        isupvote(questionId : ID!,userId : ID!) : Boolean! @auth
        isdownvote(questionId : ID!,userId : ID!) : Boolean! @auth
        getSingleQuestion(questionId : ID!) : QuestionResult!
        updateBookmarkedQuestion(questionId : ID!,userId : ID!) : Boolean! @auth
        isBookmarkedQuestion(questionId : ID!,userId : ID!) : Boolean! @auth
        deleteQuestion(questionId : ID!) : Boolean!

    }
`
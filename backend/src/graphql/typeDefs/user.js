const {gql} = require("graphql-tag")

module.exports = gql`
    type User{
        _id : ID!,
        createdAt : String,
        updatedAt : String,
        name : String!,
        mobilenumber : String!,
        password : String!,
        question : [Question!]!,
        answer : [Answer!]!,
        avatarImage : String!,
        bookmarkedQuestion : [Question!]!,
        bookmarkedAnswer : [Answer!]!
    }
    union SingleResult = SingleSuccess | SingleFailure

    type SingleSuccess {
        message : String,
        user : User
    }

    type SingleFailure{
        message : String,
        args : String
    }

    extend type Query{
        getAllUser : [User!]!
    }
    union Result = Success | Failure
    type Success{
        message : String,
        token : String,
        user : User
    }
    type Failure{
        message : String,
        args : String!
    }
    input CreateInput {
        name : String!,
        mobilenumber : String,
        password : String!
    }

    input LoginInput{
        mobilenumber : String!,
        password : String!
    }

    union ResOtp = ResSuccess | ResFailure
    type ResSuccess{
        message : String!,
        otp : Int!
    }
    type ResFailure{
        message : String!,
        args : String!
    }
    extend type Mutation{
        createUser(createInput : CreateInput!) : Result!
        loginUser(loginInput : LoginInput!) : Result!
        genOtp(mobilenumber : String!) : ResOtp!
        updateUser(mobilenumber : String!,password : String!) : SingleResult!
        getSingleUser(_id : ID!) : SingleResult!
        deleteUser(_id : ID!) : SingleResult
    }
`
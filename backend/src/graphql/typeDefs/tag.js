const {gql} = require("graphql-tag")

module.exports = gql`
    type Tag{
        _id : ID!
        createdAt : String!,
        updatedAt : String!,
        TagName : String!,
        body : String!,
        question : [Question!]!
    }
    union TagResult = TagSuccess | TagFailure
    type TagSuccess{
        message : String,
        tag : Tag
    }
    type TagFailure{
        message : String,
        args : String
    }
    extend type Query{
        getAllTag : [Tag!]!
        getAllTopTag : [Tag!]!
    }
    extend type Mutation{
        createTag(TagName : String!) : TagResult! @auth
        getSingleTag(_id : ID!) : TagResult!
    }
`
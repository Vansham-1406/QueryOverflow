const {gql} = require("graphql-tag")

module.exports = gql`
    extend type Query{
        hello : String!
    }
`
const {gql} = require("graphql-tag")

module.exports = gql`
    type Query{
        _ : String!
    }
    type Mutation{
        _ : String!
    }
    type Subscription{
        _ : String!
    }
`
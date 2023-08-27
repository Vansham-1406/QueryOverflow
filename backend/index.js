const {ApolloServer} = require("@apollo/server")
const {createServer} = require("http")
const {expressMiddleware} = require("@apollo/server/express4")
const {makeExecutableSchema} = require("@graphql-tools/schema")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const {PORT} = require("./src/config/index")
const {resolvers,typeDefs} = require("./src/graphql/index")
const Connect_db = require("./src/functions/db")

const myFunc = async () => {
    const app = express();
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({typeDefs,resolvers})
    const server = new ApolloServer({schema})
    await server.start();
    app.use("/graphql",cors(),bodyParser.json(),expressMiddleware(server))
    httpServer.listen(PORT, function(){
        Connect_db();
        console.log(`Connected to Port http://localhost:${PORT}/graphql`)
    })
}

myFunc();
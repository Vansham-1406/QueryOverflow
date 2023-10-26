const { ApolloServer } = require("@apollo/server");
const { createServer } = require("http");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const AuthDirectiveTransformer = require("./src/directives/authDirectives")
const AuthDirective = require("./src/middleware/auth")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./src/config/index");
const { resolvers, typeDefs } = require("./src/graphql/index");
const Connect_db = require("./src/functions/db");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { PubSub } = require("graphql-subscriptions");
const User = require("./src/models/User");
const Tag = require("./src/models/Tag");
const Answer = require("./src/models/Answer");
const Question = require("./src/models/Question");

const myFunc = async () => {
  const app = express();
  const pubsub = new PubSub();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    path: "/graphql",
    server: httpServer,
  });

  const cleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        ctx["pubsub"] = pubsub;
        return { ctx, msg, args };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema : AuthDirectiveTransformer(schema),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await cleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  app.use(AuthDirective);
  app.use(
    "/graphql",
    cors(),
    bodyParser.json({ limit: '100mb' }),
    expressMiddleware(server, {
      context: ({req,res}) => {
        const {isAuth,user} = req;
        return {
          isAuth,
          user,
          UserContext: User,
          QuestionContext: Question,
          AnswerContext: Answer,
          TagContext: Tag,
        };
      },
    })
  );
  httpServer.listen(PORT, function () {
    Connect_db();
    console.log(`Connected to Port http://localhost:${PORT}/graphql`);
  });
};

myFunc();

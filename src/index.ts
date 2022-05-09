import { ApolloServer } from "apollo-server";
import { dataSources } from "./dataSource";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});

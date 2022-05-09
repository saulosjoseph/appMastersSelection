import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";

const server = new ApolloServer({ typeDefs });

server.listen(4000).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});

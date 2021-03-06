import { IResolvers } from "@graphql-tools/utils/Interfaces";

export const resolvers: IResolvers = {
  Query: {
    superheroes: async (parent, { limit, order }, { dataSources }, info) =>
      dataSources.superHero.list(limit, order),
    searchHeroes: async (parent, { query, filter }, { dataSources }, info) =>
      dataSources.superHero.search(query, filter),
  },
};

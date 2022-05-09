import { gql } from "apollo-server/dist/exports";

export const typeDefs = gql`
  type Query {
    superheroes(limit: Int, order: String): [Superhero]
    searchHeroes(query: String!, filter: String): [Superhero]
  }
  type Superhero {
    id: ID
    name: String
    slug: String
    powerstats: Powerstats
    appearance: Appearance
    biography: Biography
    work: Work
    connections: Connections
    images: Images
  }
  type Powerstats {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
  }
  type Appearance {
    gender: String
    race: String
    eyeColor: String
    hairColor: String
    height: [String]
    weight: [String]
  }
  type Biography {
    fullName: String
    alterEgos: String
    aliases: [String]
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String
  }
  type Work {
    occupation: String
    base: String
  }
  type Connections {
    groupAffiliation: String
    relatives: String
  }
  type Images {
    xs: String
    sm: String
    md: String
    lg: String
  }
`;

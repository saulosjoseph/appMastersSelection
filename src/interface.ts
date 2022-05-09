export interface Superhero {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearance;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
}

interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface Appearance {
  gender: string;
  race: string;
  eyeColor: string;
  hairColor: string;
  height: [string];
  weight: [string];
}

interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: [string];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

interface Work {
  occupation: string;
  base: string;
}

interface Connections {
  groupAffiliation: string;
  relatives: string;
}

interface Images {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

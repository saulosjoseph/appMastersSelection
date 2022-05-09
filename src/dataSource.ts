import { RESTDataSource } from "apollo-datasource-rest";
import {
  Appearance,
  Biography,
  Connections,
  Images,
  Powerstats,
  Superhero,
  Work,
} from "./interface";

const API_URL = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api";

export class SuperHero extends RESTDataSource {
  public heroes: Array<Superhero> = [];

  constructor() {
    super();
    this.baseURL = API_URL;
  }

  async getHeroes() {
    const data = await this.get("all.json");
    this.heroes = data;
  }

  deepHasOwnProperty(
    obj: Partial<Superhero>,
    keyValue: string,
    father?: string
  ): any {
    if (obj.hasOwnProperty(keyValue)) {
      return father;
    }
    return Object.keys(obj)
      .map((key) => {
        if (typeof obj[key as keyof Partial<Superhero>] == "object") {
          return this.deepHasOwnProperty(
            obj[key as keyof Superhero],
            keyValue,
            key
          );
        }
      })
      .filter((value) => typeof value === "string")[0];
  }

  async list(limit?: number, order?: string) {
    const response: Array<Superhero> = [];
    if (this.heroes.length === 0) {
      await this.getHeroes();
    }
    response.push.apply(response, this.heroes);

    if (order) {
      const whereIs = response[0][order as keyof Superhero]
        ? "root"
        : this.deepHasOwnProperty(response[0], order);
      response.sort((a, b) => {
        if (whereIs === "root") {
          return (
            Number(a[order as keyof Superhero]) -
            Number(b[order as keyof Superhero])
          );
        } else if (a[whereIs as keyof Superhero]) {
          return (
            a[whereIs as keyof Superhero][order] -
            b[whereIs as keyof Superhero][order]
          );
        }
        return 0;
      });
    }
    return response.slice(0, limit);
  }
}

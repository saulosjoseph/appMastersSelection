import { RESTDataSource } from "apollo-datasource-rest";
import { Superhero } from "./interface";

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
  ): string {
    if (obj.hasOwnProperty(keyValue) && father) {
      return father;
    }
    const response = Object.keys(obj)
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
    if (response) {
      return response;
    } else {
      return "NA";
    }
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

  deepFind(superhero: Superhero, query: string, filter: string): boolean {
    for (let prop in superhero[filter as keyof Superhero]) {
      if (
        typeof superhero[filter as keyof Superhero][prop] === "string" &&
        (superhero[filter as keyof Superhero][prop] as string).toLowerCase() ===
          query.toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  }

  find(superhero: Superhero, query: string, filter: string): boolean {
    if (typeof superhero[filter as keyof Superhero] === "object") {
      return this.deepFind(superhero, query, filter);
    } else if (typeof superhero[filter as keyof Superhero] === "string") {
      return (
        (superhero[filter as keyof Superhero] as string).toLowerCase() ===
        query.toLowerCase()
      );
    }
    return false;
  }

  async search(query: string, filter?: string) {
    const response: Array<Superhero> = [];
    if (this.heroes.length === 0) {
      await this.getHeroes();
    }
    if (filter) {
      response.push.apply(
        response,
        this.heroes.filter((superhero) => this.find(superhero, query, filter))
      );
    } else {
      response.push.apply(
        response,
        this.heroes.filter((superhero) => {
          for (let prop in superhero) {
            if (this.find(superhero, query, prop)) {
              return true;
            }
          }
        })
      );
    }
    return response;
  }
}

export const dataSources = () => ({ superHero: new SuperHero() });

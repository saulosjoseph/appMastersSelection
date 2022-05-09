import { SuperHero } from "./dataSource";
import mockApiResponse from "./mockApiResponse.json";

let superhero: SuperHero;
const mockGet = jest.fn(() => mockApiResponse);
jest.mock("apollo-datasource-rest", () => {
  class MockRESTDataSource {
    baseUrl = "";
    get = mockGet;
  }
  return {
    RESTDataSource: MockRESTDataSource,
  };
});
beforeEach(() => {
  superhero = new SuperHero();
});
describe("SuperHero", () => {
  it("Should initiate with empty heroes array", () => {
    const initialHeroesArray = superhero.heroes.length;

    expect(initialHeroesArray).toBe(0);
  });
});
describe("getHeroes", () => {
  it("Should populate heroes array", async () => {
    await superhero.getHeroes();
    const heroesArray = superhero.heroes.length;

    expect(heroesArray).toBeGreaterThan(0);
  });
});

describe("list", () => {
  it("Should return an array of heroes", async () => {
    const response = await superhero.list();

    expect(response.length).toBeGreaterThan(0);
  });

  it("list(3) Should return only 3 heroes", async () => {
    const response = await superhero.list(3);

    expect(response.length).toBe(3);
  });

  it("list(undefined, 'durability') Should return heroe with less durability in first place, id heroe = 3", async () => {
    const response = await superhero.list(undefined, "durability");

    expect(response[0].id).toBe(3);
  });

  it("list(1, 'durability') Should return only heroe with less durability, id heroe = 3", async () => {
    const response = await superhero.list(1, "durability");

    expect(response[0].id).toBe(3);
    expect(response.length).toBe(1);
  });
});

describe("search", () => {
  it("search('Abe Sapien') should return heroe with id 2", async () => {
    const response = await superhero.search("Abe Sapien");

    expect(response[0].id).toBe(2);
    expect(response[0].name).toBe("Abe Sapien");
    expect(response.length).toBe(1);
  });

  it("search('Ungara', 'biography') should return heroe with id 2", async () => {
    const response = await superhero.search("Ungara", "biography");

    expect(response[0].id).toBe(3);
    expect(response[0].biography.placeOfBirth).toBe("Ungara");
    expect(response.length).toBe(1);
  });

  it("search('Blue') should return a list with 4 heroes", async () => {
    const response = await superhero.search("Blue");

    expect(response.length).toBe(4);
  });
});

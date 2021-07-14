const { RESTDataSource } = require("apollo-datasource-rest");

class starWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api/";
  }

  async getAllPeople() {
    const response = await this.get("people");
    return response.results.map((person) => this.personReducer(person));
  }
  async getPeopleByPage({ pageNum }) {
    const response = await this.get("people/", { page: pageNum });
    return Array.isArray(response.results)
      ? response.results.map((person) => this.personReducer(person))
      : [];
  }

  async personReducer(person) {
    const homeEndpoint = person.homeworld.slice(-2, -1);
    const homeNum = parseInt(homeEndpoint);
    const home = await this.get(`planets/${homeNum}`);

    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeworld: home.name,
    };
  }

  async getPeopleByName({ nameSearch }) {
    const response = await this.get("people/", { search: nameSearch });
    return Array.isArray(response.results)
      ? response.results.map((person) => this.personReducer(person))
      : [];
  }
}

module.exports = starWarsAPI;

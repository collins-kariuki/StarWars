const { RESTDataSource } = require("apollo-datasource-rest");

class starWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev/api/";
  }

  async getAllPeople() {
    const response = await this.get("people");
    return Array.isArray(response.results)
      ? response.results.map((person) => this.personReducer(person))
      : [];
  }

  async getPeopleByPage({ pageNum }) {
    const response = await this.get("people/", { page: pageNum });
    return Array.isArray(response.results)
      ? response.results.map((person) => this.personReducer(person))
      : [];
  }

  async getPeopleByName({ nameSearch }) {
    const response = await this.get("people/", { search: nameSearch });
    return Array.isArray(response.results)
      ? response.results.map((person) => this.personReducer(person))
      : [];
  }
  personReducer(person) {
    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeworld: person.homeworld,
    };
  }
}

module.exports = starWarsAPI;

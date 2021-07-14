const { gql } = require("apollo-server");

const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }
  type Query {
    allPeople: [Person]!
    people(page: Int): [Person]!
    person(name: String): [Person]!
  }
`;

module.exports = typeDefs;

import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { compact } from "@apollo/client/utilities";
import { useParams } from "react-router";

const client = new ApolloClient({
  uri: "https://3sdv5.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});

const PERSON_QUERY = gql`
  query getPerson($name: String!) {
    person(name: $name) {
      name
      height
      mass
      gender
    }
  }
`;

function Person() {
  const { name } = useParams();
  console.log(name);
  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: { name },
  });
  console.log("hapa");
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const names = data.person[0].name;
  const height = data.person[0].height;
  const mass = data.person[0].mass;
  const gender = data.person[0].gender;
  return (
    <div
      key={names}
      class="card"
      style={{ maxWidth: 30 + "rem" }}
      style={{ textAlignLast: "left" }}
    >
      <div class="card-body">
        <h4 class="card-title" style={{ textAlignLast: "left" }}>
          {names}
        </h4>
        <h6 class="card-subtitle mb-2 text-muted">Mass: {mass}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Height: {height}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Gender: {gender}</h6>
        <p class="card-text"></p>
      </div>
    </div>
  );
}
export default Person;

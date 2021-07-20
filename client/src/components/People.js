import React from "react";
import { useQuery, gql } from "@apollo/client";

import { Link } from "react-router-dom";

const PEOPLE_QUERY = gql`
  query getAllPeople {
    allPeople {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

function People() {
  const { loading, error, data } = useQuery(PEOPLE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPeople.map(({ name, gender }) => (
    <div key={name} class="card" style={{ maxWidth: 30 + "rem" }}>
      <div class="card-body">
        <h4 class="card-title" style={{ textAlignLast: "left" }}>
          {name}
        </h4>
        <p class="card-text"></p>
        <Link to={`/person/${name}`} class="btn btn-outline-info">
          Details
        </Link>
      </div>
    </div>
  ));
}
export default People;

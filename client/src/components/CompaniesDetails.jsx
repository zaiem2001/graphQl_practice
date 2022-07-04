import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { COMPANIES_QUERY } from "../graphql/queries";
import Error from "./Error";

const CompaniesDetails = () => {
  const { data, error, loading } = useQuery(COMPANIES_QUERY);

  if (loading) return <p>loading...</p>;
  if (error) return <Error />;

  return (
    <div>
      <h1 className="title">Companies</h1>
      <ul className="box">
        {data.companies.map((c) => (
          <li className="media" key={c.id}>
            <div className="media-content">
              <Link to={`/companies/${c.id}`}>{c.name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesDetails;

import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { COMPANY_QUERY } from "../graphql/queries";
import Error from "./Error";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const { data, error, loading } = useQuery(COMPANY_QUERY, {
    variables: { id: companyId },
  });

  if (error) return <Error />;
  return (
    <div>
      {!loading && (
        <>
          <h1 className="title">{data?.company.name}</h1>
          <div className="box">{data?.company.description}</div>

          <div>
            <h3 className="title is-4">Jobs Available here :</h3>

            <JobList jobs={data?.company.jobs} />
          </div>
        </>
      )}
    </div>
  );
}

export default CompanyDetail;

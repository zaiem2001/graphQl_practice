import JobList from "./JobList";
import { JOBS_QUERY } from "../graphql/queries";
import Error from "./Error";
import { useQuery } from "@apollo/client";

function JobBoard() {
  const { data, error, loading, refetch } = useQuery(JOBS_QUERY, {
    // fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error />;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={data.jobs} refetch={refetch} />
    </div>
  );
}

export default JobBoard;

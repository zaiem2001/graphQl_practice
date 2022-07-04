import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDeleteJob } from "../graphql/hooks";
import { JOB_QUERY } from "../graphql/queries";
import Error from "./Error";

function JobDetail() {
  const { jobId } = useParams();
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { id: jobId },
  });

  const navigate = useNavigate();
  const { deleteJob } = useDeleteJob();

  const handleDelete = () => {
    deleteJob(jobId).then((response) => {
      if (response) {
        navigate("/");
      }
    });
  };

  if (error) return <Error />;

  return (
    <div>
      {!loading && data.job && (
        <>
          <div className="job_header">
            <h1>{data.job.title}</h1>

            <span className="icon delete-icon">
              <i onClick={handleDelete} className="fa-solid fa-trash"></i>{" "}
            </span>
          </div>

          <h2 className="subtitle">
            <Link to={`/companies/${data.job.company.id}`}>
              {data.job.company.name}
            </Link>
          </h2>
          <div className="box">{data.job.description}</div>
        </>
      )}
    </div>
  );
}

export default JobDetail;

import { Link } from "react-router-dom";
import { useDeleteJob } from "../graphql/hooks";

function JobItem({ job, refetch }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  const { deleteJob } = useDeleteJob();

  const handleDelete = (id) => {
    deleteJob(id).then((data) => {
      if (data) {
        console.log("Job deleted");
        refetch();
      }
    });
  };

  return (
    <li className="media">
      <div className="media-content jobs">
        <Link to={`/jobs/${job.id}`}>{title}</Link>

        <span className="">
          <i
            onClick={() => handleDelete(job.id)}
            className="fa-solid fa-trash"
          ></i>{" "}
        </span>
      </div>
    </li>
  );
}

function JobList({ jobs, refetch }) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} refetch={refetch} />
      ))}
    </ul>
  );
}

export default JobList;

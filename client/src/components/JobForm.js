import { useState } from "react";
import { COMPANIES_QUERY } from "../graphql/queries";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import Error from "./Error";
import { useCreateJob } from "../graphql/hooks";

function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(null);

  const { data, error, loading } = useQuery(COMPANIES_QUERY);

  const { createJob } = useCreateJob();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    createJob(title, company, description)
      .then((response) => {
        console.log({ response });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error) return <Error />;
  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Select Company</label>

            {!loading && data?.companies.length && (
              <div className="select control">
                <select onChange={(e) => setCompany(e.target.value)}>
                  <option value="#" disabled selected>
                    Select Company
                  </option>
                  {data?.companies.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                onClick={handleSubmit}
                disabled={!data?.companies.find((c) => c.id === company)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;

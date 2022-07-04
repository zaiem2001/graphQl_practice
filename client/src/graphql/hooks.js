import { useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";
import { CREATE_JOB_MUTATION, DELETE_JOB_QUERY, JOBS_QUERY } from "./queries";

export const useCreateJob = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

  return {
    createJob: async (title, companyId, description) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input: { title, companyId, description } },
        context: { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      });

      return job;
    },
    loading,
    error: Boolean(error),
  };
};

export const useDeleteJob = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_JOB_QUERY);

  return {
    deleteJob: async (id) => {
      const {
        data: { job },
      } = await mutate({
        variables: { id },
        context: { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      });

      return job;
    },
    loading,
    error,
  };
};

// update: (cache, { data: { message } }) => {
//   cache.updateQuery(
//     {
//       query: MESSAGES_QUERY,
//     },
//     (oldData) => {
//       const newData = {
//         messages: [...oldData.messages, message],
//       };

//       return newData;
//     }
//   );
// },
// });
// return message;
// },

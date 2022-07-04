import { Job, Company } from "./db.js";
import { authUser } from "./helpers.js";

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: async (_, args) => Job.findById(args.id),

    companies: async () => Company.findAll(),
    company: async (_, args) => Company.findById(args.id),
  },

  Mutation: {
    createJob: async (_, { input }, { user }) => {
      if (!authUser(user)) throw new Error("Unauthorized");
      return await Job.create(input);
    },

    deleteJob: async (_, { id }, { user }) => {
      if (!authUser(user)) throw new Error("Unauthorized");
      return await Job.delete(id);
    },

    updateJob: (_, { input }) => Job.update(input),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};

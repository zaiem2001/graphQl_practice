import { gql } from "@apollo/client";

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      company {
        name
      }
    }
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export const COMPANIES_QUERY = gql`
  query {
    companies {
      id
      name
    }
  }
`;

export const COMPANY_QUERY = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      name
      description
      jobs {
        title
        id
      }
    }
  }
`;

export const CREATE_JOB_MUTATION = gql`
  mutation createJobMutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      description
    }
  }
`;

export const DELETE_JOB_QUERY = gql`
  mutation DeleteJob($id: ID!) {
    job: deleteJob(id: $id) {
      id
      title
      description
    }
  }
`;

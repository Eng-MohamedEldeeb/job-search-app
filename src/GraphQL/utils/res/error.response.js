export const errorResponse = ({ error, status }) => {
  throw new Error(error, { cause: status });
};

export const successResponse = ({ data, status = 200 }) => {
  return { success: true, status, data };
};

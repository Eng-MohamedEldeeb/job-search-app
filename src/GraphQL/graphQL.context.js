const context = (req) => {
  const { authorization } = req.headers;
  return { authorization };
};

export default context;

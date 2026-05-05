module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: status >= 500 ? 'Internal Server Error' : (err.message || 'Request failed'),
  });
};
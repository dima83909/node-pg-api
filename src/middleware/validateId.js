module.exports = (req, res, next, id) => {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }
  req.params.id = String(parsedId);
  next();
};

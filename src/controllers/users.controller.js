const usersService = require('../services/users.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      res.json(users);
    } catch (err) { next(err); }
  },

  getMe: async (req, res, next) => {
    try {
      const user = await usersService.getOne(req.userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) { next(err); }
  },

  getOne: async (req, res, next) => {
    try {
      if (Number(req.params.id) !== Number(req.userId)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const user = await usersService.getOne(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) { next(err); }
  },

  create: async (req, res, next) => {
    try {
      const user = await usersService.create(req.body);
      res.status(201).json(user);
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      if (Number(req.params.id) !== Number(req.userId)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const user = await usersService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) { next(err); }
  },

  remove: async (req, res, next) => {
    try {
      if (Number(req.params.id) !== Number(req.userId)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const removed = await usersService.remove(req.params.id);
      if (!removed) return res.status(404).json({ error: 'User not found' });
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
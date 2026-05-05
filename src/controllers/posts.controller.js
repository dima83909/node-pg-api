const postsService = require('../services/posts.service');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const posts = await postsService.getAll(req.userId);
      res.json(posts);
    } catch (err) { next(err); }
  },

  getOne: async (req, res, next) => {
    try {
      const post = await postsService.getOne(req.params.id, req.userId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) { next(err); }
  },

  create: async (req, res, next) => {
    try {
      const post = await postsService.create(req.body, req.userId);
      res.status(201).json(post);
    } catch (err) { next(err); }
  },

  update: async (req, res, next) => {
    try {
      const post = await postsService.update(req.params.id, req.body, req.userId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) { next(err); }
  },

  remove: async (req, res, next) => {
    try {
      const removed = await postsService.remove(req.params.id, req.userId);
      if (!removed) return res.status(404).json({ error: 'Post not found' });
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
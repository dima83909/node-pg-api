const { z } = require('zod');

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
});

const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  body: z.string().min(1, 'Body is required').optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required' },
);

module.exports = { createPostSchema, updatePostSchema };

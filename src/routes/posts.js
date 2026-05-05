const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postsController = require('../controllers/posts.controller');
const validateId = require('../middleware/validateId');
const validate = require('../middleware/validate');
const { createPostSchema, updatePostSchema } = require('../schemas/post.schema');

router.use(auth);
router.param('id', validateId);

router.get('/',       postsController.getAll);
router.get('/:id',    postsController.getOne);
router.post('/',      validate(createPostSchema), postsController.create);
router.put('/:id',    validate(updatePostSchema), postsController.update);
router.delete('/:id', postsController.remove);

module.exports = router;
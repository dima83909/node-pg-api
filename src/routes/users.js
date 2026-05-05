const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');
const validateId = require('../middleware/validateId');
const validate = require('../middleware/validate');
const { updateUserSchema } = require('../schemas/user.schema');

router.use(auth);
router.param('id', validateId);

router.get('/',      usersController.getAll);
router.get('/me',    usersController.getMe);
router.get('/:id',   usersController.getOne);
router.put('/:id',   validate(updateUserSchema), usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
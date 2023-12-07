const { Router } = require('express');
const userController = require('../controllers/users');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;

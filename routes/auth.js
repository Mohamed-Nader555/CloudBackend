const { Router } = require('express');
const authController = require('../controllers/auth');
const authValidator = require('../validators/auth')

const authRouter = Router();

authRouter.post('/signup',
    authValidator.validateNewUser(),
    authController.signUpUser);

authRouter.post('/login',
    authController.loginUser);
//authRouter.post('/', authController.createUser);
//authRouter.put('/:id', authController.updateUser);
// authRouter.delete('/:id', authController.deleteUser);

module.exports = authRouter;

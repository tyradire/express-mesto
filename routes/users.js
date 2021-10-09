const userRouter = require('express').Router();
const { getUsers, getUserById, createUser, editUserInfo, editUserAvatar } = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', editUserInfo);

userRouter.patch('/users/me/avatar', editUserAvatar);

module.exports = userRouter;
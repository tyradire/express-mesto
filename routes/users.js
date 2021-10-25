const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, getUserById, editUserInfo, editUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUser);

userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);

userRouter.patch('/users/me/avatar', editUserAvatar);

module.exports = userRouter;

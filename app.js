const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const {
  login, createUser,
} = require('./controllers/users');
const {
  verify,
} = require('./middlewares/auth');
const {
  urlValidator,
} = require('./validator/validator');

const PORT = 3000;
const app = express();

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom(urlValidator),
  }),
}), createUser);

app.use(verify);

app.use(userRouter);
app.use(cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});
app.use(errors());
/* eslint-disable no-unused-vars, no-console */
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.listen(PORT, () => console.log('Express is running'));

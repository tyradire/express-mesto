const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    res.status(500).send({ message: `Error! ${err}` });
  });

const getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) return res.status(404).send({ message: 'Пользователь с указанным id не найден' });
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const editUserInfo = (req, res) => User.findByIdAndUpdate(req.user._id,
  { ...req.body },
  { new: true, runValidators: true })
  .then((user) => {
    if (!user) return res.status(404).send({ message: 'Пользователь с указанным id не найден' });
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const editUserAvatar = (req, res) => User.findByIdAndUpdate(req.user._id,
  { avatar: req.body.avatar },
  { new: true, runValidators: true })
  .then((user) => {
    if (!user) return res.status(404).send({ message: 'Пользователь с указанным id не найден' });
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

module.exports = {
  getUsers, getUserById, createUser, editUserInfo, editUserAvatar,
};

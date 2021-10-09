const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log('Error' + err);
      res.status(500).send({message: `Error! ${err}`});
    })
};

const getUserById = (req, res) => {
  return User.findById(req.params.userId)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log('Error' + err);
      if (err.name === 'CastError') return res.status(404).send({message: `Пользователь по указанному id не найден`});
      res.status(500).send({message: `Error! ${err}`});
    })

};

const createUser = (req, res) => {
  return User.create({...req.body})
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log('Error' + err);
      if (err.name === 'ValidationError') return res.status(400).send({message: `Переданы некорректные данные при создании пользователя`});
      res.status(500).send({message: `Error! ${err}`});
    })
};

const editUserInfo = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, {...req.body}, { new: true, runValidators: true })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log('Error' + err);
      if (err.name === 'ValidationError') return res.status(400).send({message: `Переданы некорректные данные при обновлении профиля`});
      if (err.name === 'CastError') return res.status(404).send({message: `Пользователь по указанному id не найден`});
      res.status(500).send({message: `Error! ${err}`});
    })
};

const editUserAvatar = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true  })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log('Error' + err);
      if (err.name === 'ValidationError') return res.status(400).send({message: `Переданы некорректные данные при обновлении аватара`});
      if (err.name === 'CastError') return res.status(404).send({message: `Пользователь по указанному id не найден`});
      res.status(500).send({message: `Error! ${err}`});
    })
};

module.exports = { getUsers, getUserById, createUser, editUserInfo, editUserAvatar };
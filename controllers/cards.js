const Card = require('../models/card');

const createCard = (req, res) => Card.create({ owner: req.user._id, ...req.body })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => {
    res.status(500).send({ message: `Error! ${err}` });
  });

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) return res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const putLikeCard = (req, res) => Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (!card) return res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

const deleteLikeCard = (req, res) => Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (!card) return res.status(404).send({ message: 'Карточка с указанным id не найдена' });
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    if (err.name === 'CastError') return res.status(400).send({ message: 'Передан некорректный id' });
    return res.status(500).send({ message: `Error! ${err}` });
  });

module.exports = {
  createCard, getCards, deleteCard, putLikeCard, deleteLikeCard,
};

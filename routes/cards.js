const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/:cardId/likes', putLikeCard);

cardRouter.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = cardRouter;

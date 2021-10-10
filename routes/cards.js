const cardRouter = require('express').Router();
const {
  createCard, getCards, deleteCard, putLikeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRouter.post('/cards', createCard);

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);

cardRouter.put('/cards/:cardId/likes', putLikeCard);

cardRouter.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = cardRouter;

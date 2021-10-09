const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const PORT = 3000;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '615c65ff1252f9e2e9c8139c' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
})



app.listen(PORT, () => {
  console.log("Express is running")
})
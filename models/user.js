const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    minlength: 2,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(val) {
        return val.match(/^(http|https):\/\/(www.|'')?([\w-]{1,}).([\w-]{1,})(\/[\w._~:?#@!$&'()*+,;=\-\/\[\]]{1,})?/);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

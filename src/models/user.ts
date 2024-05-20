import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import Unauthorized from '../errors/unauthorized-error';

import { User, UserModel } from '../type/user';

const userSchema = new Schema<User>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v:string) => /^(https?:\/\/)(w{3}.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?(#)?$/.test(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v:string) => validator.isEmail(v),
      message: 'Некорректый адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user: User) => {
      if (!user) {
        throw new Unauthorized('Передан неверный логин или пароль.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched: boolean) => {
          if (!matched) {
            throw new Unauthorized('Передан неверный логин или пароль.');
          }
          return user;
        });
    });
};

export default model<User, UserModel>('user', userSchema);

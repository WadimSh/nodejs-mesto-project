import { Schema, model } from 'mongoose';
import validator from 'validator';
import { User } from '../type/user';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
    validate: { 
      validator: (v:any) => validator.isURL(v), 
      message: 'Некорректный URL', 
    },
  },
}, { versionKey: false });

export default model<User>('user', userSchema);

import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Card } from '../type/card';

const cardSchema = new Schema<Card>({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (v:string) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
}, { versionKey: false });

export default model<Card>('card', cardSchema);

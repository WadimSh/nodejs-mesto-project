import { Schema } from 'mongoose';

export interface Card {
  name: string;
  link: string;
  createdAt: Date;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
};
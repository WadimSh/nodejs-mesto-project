import { Document, Model } from 'mongoose';

export interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface UserModel extends Model<User> {
  findUserByCredentials: (email: string, password: string) =>
    Promise<Document<unknown, any, User>>
}

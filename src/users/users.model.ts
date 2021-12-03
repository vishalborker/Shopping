import * as mongoose from 'mongoose';

export const Userschema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  address: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export interface UsersModel {
  id: string;
  username: string;
  password: string;
  fullname: string;
  address: string;
  email: string;
  phone: string;
}

export interface UsersGetModel {
  id: string;
  username: string;
  fullname: string;
  address: string;
  email: string;
  phone: string;
}

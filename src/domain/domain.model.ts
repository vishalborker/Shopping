import * as mongoose from 'mongoose';

export const DomainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
});

export interface DomainModel {
  name: string;
  isActive: boolean;
  createdAt: Date;
}
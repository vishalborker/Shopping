import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  orderDate: { type: Date, required: true },
  productIds: [String], 
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  urlOfSale: { type: String, required: true },
});

export interface OrderModel {
  orderId: string,
  createdAt: Date,
  orderDate: Date
  productIds: [string],
  currency: string
  price: number
  urlOfSale: string
}

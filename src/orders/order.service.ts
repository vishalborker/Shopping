import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderModel>,
  ) {}

  async getOrder(id: string) {
    const result = await this.findOrder(id);
    return result;
  }

  async getAllOrders(page: number = 10, limit: number = 10, orderBy: string = 'createdAt') {
    const result = await this.orderModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .sort({ [orderBy]: -1 })
      .exec();
    return result;
  }

  async insertOrder(body: OrderModel) {
    const order = new this.orderModel(body);
    const result = await order.save();
    return { _id: result.id } as { _id: string };
  }

  private async findOrder(id: string): Promise<any> {
    let order;
    try {
      order = await this.orderModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException('Could not find the specified order');
    }
    if (!order) {
      throw new NotFoundException('Could not find the specified order');
    }
    return {
      id: order._id,
      productIds: order.productIds,
      currency: order.currency,
      price: order.price,
      urlOfSale: order.urlOfSale,
      orderId: order.orderId,
      createdAt: order.createdAt,
      orderDate: order.orderDate,
    };
  }

  async findAndDelete(id: string): Promise<any> {
    let result;
    try {
      result = await this.orderModel.findOneAndDelete({ _id: { $eq: id } }).exec();
    } catch (e) {
      throw new NotFoundException('Could not find the specified order');
    }
    if (!result) {
        throw new NotFoundException('Could not find the specified order');
    }
    return { deleted: true };
  }
}

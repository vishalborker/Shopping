import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Query,
  Delete 
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() body,
  ) {
    const data = {
      productIds: body.productIds,
      currency: body.currency,
      price: body.price,
      urlOfSale: body.urlOfSale,
      orderId: uuidv4(),
      createdAt: new Date(),
      orderDate: new Date(),
    };
    const result = await this.orderService.insertOrder(data);
    return result;
  }

  @Get()
  async getAllDomains(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
  ) {
    console.log(typeof page, {limit}, typeof limit, orderBy);
    
    const orders = await this.orderService.getAllOrders(Number(page), Number(limit), orderBy);
    return orders.map((order) => ({
      id: order._id,
      productIds: order.productIds,
      currency: order.currency,
      price: order.price,
      urlOfSale: order.urlOfSale,
      orderId: order.orderId,
      createdAt: order.createdAt,
      orderDate: order.orderDate,
    }));
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrder(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.findAndDelete(id);
  }
}

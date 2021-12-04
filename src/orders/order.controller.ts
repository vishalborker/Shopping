import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Query,
  BadRequestException,
  Logger, 
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.validation';
import { DomainService } from 'src/domain/domain.service';
import { SocketService } from 'src/gateway/socket.service';

@Controller('order')
export class OrderController {
  private logger: Logger = new Logger('OrderController');
  constructor(
    private readonly orderService: OrderService,
    private readonly domainService: DomainService,
    private readonly socketService: SocketService
  ) {}

  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDTO,
  ) {
    const data = {
      productIds: createOrder.productIds,
      currency: createOrder.currency,
      price: createOrder.price,
      urlOfSale: createOrder.urlOfSale,
      orderId: uuidv4(),
      createdAt: new Date(),
      orderDate: new Date(),
    };

    const urlFound = await this.domainService.findByDomainName(createOrder.urlOfSale);
    if (!urlFound) {
      throw new BadRequestException(`urlOfSale: ${createOrder.urlOfSale} is either not whitelisted or not active`);
    }
    const result = await this.orderService.insertOrder(data);
    this.socketService.socket.to(createOrder.urlOfSale).emit('order', createOrder);
    this.logger.log(`New Order Created!`);
    return result;
  }

  @Get()
  async getAllDomains(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
  ) {    
    const orders = await this.orderService.getAllOrders(Number(page), Number(limit), orderBy);
    this.logger.log(`Getting All Orders Using Pagination!`);
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
    this.logger.log(`Getting Single Order!`);
    return await this.orderService.getOrder(id);
  }
}

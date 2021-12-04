import { 
  SubscribeMessage, 
  WebSocketGateway, 
  OnGatewayInit, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { DomainService } from 'src/domain/domain.service';
import { SocketService } from './socket.service';

// Websocket connection with client
@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly domainService: DomainService,
    private readonly socketService: SocketService
    ) {}
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('EventGateway');

  afterInit(server: Socket) {
    this.logger.log(`Websocket Initialized!!!`);
    this.logger.log(`Initialized socket in SocketService!`);
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);
  }
  async handleConnection(client: any, ...args: any[]) {
    const url: string = client.handshake.query.url;
    const result = await this.domainService.findByDomainName(url);
    if (!result || !url) {
      client.disconnect();
      this.logger.log('Disconnect the client, Since the Query.Url is not Whitelisted');
      return false;
    }
    this.logger.log(`Client Connected ${client.id}`);
  }

  // not being used.
  @SubscribeMessage('createOrder')
  handleMessage(socket: Socket, payload: any): void {
    this.logger.log(`OrderRecieved ${JSON.stringify(payload)}`);
    socket.to(payload.urlOfSale).emit('order', payload);
  }

  
  @SubscribeMessage('newConnection')
  createRoom(socket: Socket, url: string): WsResponse<unknown> {
    this.logger.log(`New Connection: ${url}`);
    socket.join(url);
    socket.to(url).emit('roomCreated', { room: url});
    return { event: 'roomCreated', data: url };
  }
}

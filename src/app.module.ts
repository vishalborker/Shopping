import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { OrderModule } from './orders/order.module';
import { EventGateway } from './gateway/event.gateway';
import { SocketModule } from './gateway/socket.module';

const DATABASE_USER = '';
const DATABASE_NAME = '';
const DATABASE_PASSWORD = '';
const DATABASE_HOST = ''

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get<string>('DATABASE_USER') || DATABASE_USER;
        const pass = configService.get<string>('DATABASE_PASSWORD') || DATABASE_PASSWORD;
        const db = configService.get<string>('DATABASE_NAME') || DATABASE_NAME;
        const domain = configService.get<string>('DATABASE_HOST') || DATABASE_HOST;
        return {
          uri: `mongodb+srv://${user}:${pass}@${domain}/${db}?retryWrites=true&w=majority`,
        };
      },
      inject: [ConfigService],
    }),
    DomainModule,
    OrderModule,
    SocketModule,
  ],
  providers: [ 
    AppService, 
    EventGateway
  ],
  exports: [
    EventGateway 
  ]
})
export class AppModule {}

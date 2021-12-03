import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Userschema } from './users.model';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: Userschema }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

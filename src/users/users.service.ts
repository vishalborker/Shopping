import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersModel>,
  ) {}

  async createUser(
    username: string,
    password: string,
    fullname: string,
    address: string,
    email: string,
    phone: string,
  ) {
    const userExists = await this.findUser(username);

    if (userExists) {
      throw new BadRequestException('Username already taken!');
    }

    const user = new this.usersModel({
      username,
      password,
      fullname,
      address,
      email,
      phone,
    });

    const result = await user.save();
    return { id: result._id, username: result.username };
  }

  async findUser(username: string) {
    console.log({username});
    const user = await this.usersModel.findOne({username}).exec();
    console.log({user});
    if (user) {
      return {
        id: user._id,
        password: user.password,
        username: user.username,
        email: user.email,
        phone: user.phone,
        fullname: user.fullname,
        address: user.address
      } as UsersModel
    }
  }

  async findUserById(id: any) {
    const user = await this.usersModel.findById(id).exec();
    if (user) {
      return {
        id: user._id,
        password: user.password,
        username: user.username,
        email: user.email,
        phone: user.phone,
        fullname: user.fullname,
        address: user.address
      } as UsersModel
    }
    throw new NotFoundException('Requested user not found');
  }

  async findAllUsers() {
    const users = await this.usersModel.find().exec()
    if (users.length) {
      return users.map(user => {
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          fullname: user.fullname,
          address: user.address
        }
      })
    }
    return [];
  }

  
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DomainModel } from './domain.model';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel('Domain') private readonly domainModel: Model<DomainModel>,
  ) {}

  async getDomain(id: string) {
    const result = await this.findDomain(id);
    return result;
  }

  async getAllDomains() {
    const result = await this.domainModel.find().exec();
    return result;
  }

  async insertDomain(name: string, isActive: boolean, createdAt: Date = new Date()) {
    const domain = new this.domainModel({ name, isActive, createdAt });
    const result = await domain.save();
    return { _id: result.id } as { _id: string };
  }

  async updateDomain(id:string, name: string, isActive: boolean) {
    const result = await this.domainModel.findByIdAndUpdate(
          id,
          { 
            ...(name && { name }),
            ...(typeof isActive === 'boolean' && { isActive })
          }, { useFindAndModify: false }
        ).exec();
    return { id: result.id } as { id: string };
  }

  private async findDomain(id: string): Promise<DomainModel> {
    let result;
    try {
      result = await this.domainModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException('Could not find the specified product');
    }
    if (!result) {
      throw new NotFoundException('Could not find the specified product');
    }
    return {
      name: result.name,
      isActive: result.isActive,
      createdAt: result.createAt,
    };
  }

  async findByDomainName(domainName: string = null): Promise<any> {
    const result = await this.domainModel.findOne({ name: { $eq: domainName }, isActive: { $eq: true } }).exec();
    return result;
  }

  async findAndDelete(id: string): Promise<any> {
    let result;
    try {
      result = await this.domainModel.findOneAndDelete({ _id: { $eq: id } }).exec();
    } catch (e) {
      throw new NotFoundException('Could not find the specified domain');
    }
    if (!result) {
        throw new NotFoundException('Could not find the specified domain');
    }
    return { deleted: true };
  }
}

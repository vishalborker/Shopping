import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put, 
  Delete 
} from '@nestjs/common';

import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  async createDomain(
    @Body('name') name: string,
    @Body('isActive') isActive: boolean,
  ) {
    const result = await this.domainService.insertDomain(
      name,
      isActive,
    );
    return result;
  }

  @Put(':id')
  async updateDomain(
    @Body('name') name: string,
    @Body('isActive') isActive: boolean,
    @Param('id') id: string
  ) {
    const result = await this.domainService.updateDomain(
      id,
      name,
      isActive,
    );
    return result;
  }

  @Get()
  async getAllDomains() {
    const domains = await this.domainService.getAllDomains();
    return domains.map((domain) => ({
      _id: domain._id,
      name: domain.name,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
    }));
  }

  @Get(':id')
  async getDomain(@Param('id') id: string) {
    return await this.domainService.getDomain(id);
  }

  @Delete(':id')
  async deleteDomain(@Param('id') id: string) {
    return await this.domainService.findAndDelete(id);
  }
}

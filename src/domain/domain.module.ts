import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './domain.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
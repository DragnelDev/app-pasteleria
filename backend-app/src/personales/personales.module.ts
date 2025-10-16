import { Module } from '@nestjs/common';
import { PersonalesService } from './personales.service';
import { PersonalesController } from './personales.controller';
import { Personal } from './entities/personal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Personal])],
  controllers: [PersonalesController],
  providers: [PersonalesService],
})
export class PersonalesModule {}

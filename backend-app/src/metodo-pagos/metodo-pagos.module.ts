import { Module } from '@nestjs/common';
import { MetodoPagosService } from './metodo-pagos.service';
import { MetodoPagosController } from './metodo-pagos.controller';
import { MetodoPago } from './entities/metodo-pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago])],
  controllers: [MetodoPagosController],
  providers: [MetodoPagosService],
  exports: [MetodoPagosService, TypeOrmModule],
})
export class MetodoPagosModule {}

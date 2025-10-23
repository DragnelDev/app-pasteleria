import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';
import { RolesModule } from './roles/roles.module';
import { EstadoPedidosModule } from './estado-pedidos/estado-pedidos.module';
import { MetodoPagosModule } from './metodo-pagos/metodo-pagos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AuditoriaSubscriber } from './common/subscribers/auditoria.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuariosModule,
    DireccionesModule,
    ProductosModule,
    PedidosModule,
    DetallePedidosModule,
    RolesModule,
    EstadoPedidosModule,
    MetodoPagosModule,
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuditoriaSubscriber],
})
export class AppModule {}

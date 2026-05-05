import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { FinanceModule } from './modules/finance/finance.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { Client } from './modules/clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   // ← замін на свої дані
      password: 'CRMproTop@',   // ← замін на свої дані
      database: 'crmsystem',  // ← назва бази
      entities: [Client],
      synchronize: true,      // auto-створює таблиці (тільки для dev!)
    }),
    UsersModule,
    ClientsModule,
    FinanceModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
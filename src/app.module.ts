import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { FinanceModule } from './modules/finance/finance.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [UsersModule, ClientsModule, FinanceModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
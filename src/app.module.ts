import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ShareModule } from './share/share.module';
import { TradeModule } from './trade/trade.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'cem123',
      database: 'eva-exchange',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    PortfolioModule,
    ShareModule,
    TradeModule,
  ],
})
export class AppModule {}

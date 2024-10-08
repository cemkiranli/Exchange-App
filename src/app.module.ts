import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ShareModule } from './share/share.module';
import { TradeModule } from './trade/trade.module';
import { ShareSeeder } from './database/share.seeder';
import { Share } from './models/share.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SequelizeModule.forFeature([Share]),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadModels: true,
        synchronize: true,
        logging: true,
        sync: { force: true },
      }),
    }),
    AuthModule,
    PortfolioModule,
    ShareModule,
    TradeModule,
  ],
  providers: [ShareSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly shareSeeder: ShareSeeder) {}

  async onModuleInit() {
    await this.shareSeeder.seed();
  }
}

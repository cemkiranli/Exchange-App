import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { Trade } from '../models/trade.model';
import { Portfolio } from '../models/portfolio.model';
import { Share } from '../models/share.model';
import { Stock } from '../models/stock.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Trade]),
        SequelizeModule.forFeature([Portfolio]), 
        SequelizeModule.forFeature([Share]),
        SequelizeModule.forFeature([Stock]),
    ],
    providers:[TradeService],
    controllers:[TradeController]
})
export class TradeModule {}

import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from '../models/portfolio.model';
import { User } from '../models/user.model';
import { Share } from '../models/share.model';
import { Trade } from '../models/trade.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Portfolio]), 
        SequelizeModule.forFeature([User]),
        SequelizeModule.forFeature([Share]), 
        SequelizeModule.forFeature([Trade]),
    ],
    providers:[PortfolioService],
    controllers:[PortfolioController]
})
export class PortfolioModule {}

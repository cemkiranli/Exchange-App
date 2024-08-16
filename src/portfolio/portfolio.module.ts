import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from '../models/portfolio.model';
import { User } from 'src/models/user.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Portfolio]), 
        SequelizeModule.forFeature([User]),
    ],
    providers:[PortfolioService],
    controllers:[PortfolioController]
})
export class PortfolioModule {}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trade } from '../models/trade.model';
import { CreateTradeDto } from './dto/trade.dto';
import { Portfolio } from '../models/portfolio.model';
import { Share } from '../models/share.model';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade) private readonly tradeModel: typeof Trade,
    @InjectModel(Portfolio) private readonly portfolioModel: typeof Portfolio,
    @InjectModel(Share) private readonly shareModel: typeof Share,
  ) {}

  async createTrade(createTradeDto: CreateTradeDto): Promise<Trade> {
    const { portfolioId, shareId, quantity, price, type } = createTradeDto;

    const portfolio = await this.portfolioModel.findByPk(portfolioId);
    if (!portfolio) {
      throw new BadRequestException('Portfolio not found.');
    }

    const share = await this.shareModel.findByPk(shareId);
    if (!share) {
      throw new BadRequestException('Share not found.');
    }

    const currentPrice = share.price;
    if (price !== currentPrice) {
      throw new BadRequestException('Price does not match the current price of the share.');
    }

    if (type === 'BUY') {
      return this.tradeModel.create(createTradeDto);
    } else if (type === 'SELL') {
      const trades = await this.tradeModel.findAll({
        where: {
          portfolioId,
          shareId,
          type: 'BUY',
        },
      });

      const totalBought = trades.reduce((sum, trade) => sum + trade.quantity, 0);
      const totalSold = (await this.tradeModel.findAll({
        where: {
          portfolioId,
          shareId,
          type: 'SELL',
        },
      })).reduce((sum, trade) => sum + trade.quantity, 0);

      const availableQuantity = totalBought - totalSold;
      if (availableQuantity < quantity) {
        throw new BadRequestException('Insufficient quantity for sale.');
      }

      return this.tradeModel.create(createTradeDto);
    } else {
      throw new BadRequestException('Invalid trade type.');
    }
  }

}

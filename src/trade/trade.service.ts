import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trade } from '../models/trade.model';
import { Portfolio } from '../models/portfolio.model';
import { Share } from '../models/share.model'; 
import { Stock } from '../models/stock.model';
import { TradeDto } from './dto/trade.dto';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade) private readonly tradeModel: typeof Trade,
    @InjectModel(Portfolio) private readonly portfolioModel: typeof Portfolio,
    @InjectModel(Share) private readonly shareModel: typeof Share,
    @InjectModel(Stock) private readonly stockModel: typeof Stock,
  ) {}

  // BUY Shares Function
  async buyShares(tradeDto: TradeDto): Promise<void> {
    const { portfolioId, symbol, quantity } = tradeDto;

    const portfolio = await this.portfolioModel.findByPk(portfolioId, {
      include: ['stocks'],
    });
    if (!portfolio) {
      throw new BadRequestException('Portfolio not found.');
    }

    const share = await this.shareModel.findOne({ where: { symbol } });
    if (!share) {
      throw new BadRequestException(`Share with symbol ${symbol} not found.`);
    }

    const totalPrice = quantity * share.price;
    if (portfolio.balance < totalPrice) {
      throw new BadRequestException('Insufficient balance to buy shares.');
    }

    let stock = portfolio.stocks.find(s => s.symbol === symbol);
    if (stock) {
      stock.quantity += quantity;
      await stock.save();
    } else {
      await this.stockModel.create({
        portfolioId: portfolio.id,
        symbol,
        quantity,
        price: share.price,
      });
    }

    portfolio.balance -= totalPrice;
    await portfolio.save();
  }

  // SELL Shares Function
  async sellShares(tradeDto: TradeDto): Promise<void> {
    const { portfolioId, symbol, quantity } = tradeDto;

    const portfolio = await this.portfolioModel.findByPk(portfolioId, {
      include: ['stocks'],
    });
    if (!portfolio) {
      throw new BadRequestException('Portfolio not found.');
    }

    const share = await this.shareModel.findOne({ where: { symbol } });
    if (!share) {
      throw new BadRequestException(`Share with symbol ${symbol} not found.`);
    }

    const totalPrice = quantity * share.price;

    let stock = portfolio.stocks.find(s => s.symbol === symbol);
    if (!stock) {
      throw new BadRequestException('Stock not found in portfolio.');
    }

    if (stock.quantity < quantity) {
      throw new BadRequestException('Insufficient stock quantity to sell.');
    }

    stock.quantity -= quantity;
    if (stock.quantity === 0) {
      await stock.destroy();
    } else {
      await stock.save();
    }

    portfolio.balance = portfolio.balance + totalPrice
    console.log(portfolio.balance, 'after total price')
    await portfolio.save();

  }
}

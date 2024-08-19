import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Portfolio } from '../models/portfolio.model';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Share } from '../models/share.model';
import { Trade } from '../models/trade.model';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Portfolio) private readonly portfolioModel: typeof Portfolio,
    @InjectModel(Share) private readonly shareModel: typeof Share,
    @InjectModel(Trade) private readonly tradeModel: typeof Trade,
  ) {}

  async createPortfolio(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const userExists = await this.userModel.findByPk(createPortfolioDto.userId);

    if (!userExists) {
      throw new BadRequestException('User not found.');
    }

    const existingPortfolio = await Portfolio.findOne({
      where: {
        userId: createPortfolioDto.userId,
        name: createPortfolioDto.name,
      },
    });

    if (existingPortfolio) {
      throw new BadRequestException('A portfolio with this name already exists. Please choose a different name.');
    }

    const initialBalance = 500;

    const portfolio = await this.portfolioModel.create({
      ...createPortfolioDto,
      balance: initialBalance,
      stocks: []
    });

    return portfolio;
  }

  async getAllPortfolios(): Promise<Portfolio[]> {
    return this.portfolioModel.findAll({
      include: [User],
    });
  }

  async getPortfolioById(id: number): Promise<any> {
    const portfolio = await this.portfolioModel.findByPk(id);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found.');
    }

    const trades = await this.tradeModel.findAll({
      where: { portfolioId: id },
    });

    const stocks = await Promise.all(
      trades.map(async (trade) => {
        const share = await this.shareModel.findOne({ where: { symbol: trade.symbol } });
        return {
          symbol: trade.symbol,
          quantity: trade.quantity,
          price: trade.price,
        };
      }),
    );

    return {
      ...portfolio.toJSON(),
      stocks,
    };
  }



  // async updatePortfolio(id: number, updatePortfolioDto: UpdatePortfolioDto): Promise<[number, Portfolio[]]> {
  //   const [updatedCount, updatedPortfolios] = await this.portfolioModel.update(updatePortfolioDto, {
  //     where: { id },
  //     returning: true,
  //   });

  //   if (updatePortfolioDto.stocks && updatePortfolioDto.stocks.length > 0) {
  //     const portfolio = updatedPortfolios[0];

  //     let updatedBalance = portfolio.balance;
  //     for (const stock of updatePortfolioDto.stocks) {
  //       const share = await this.shareModel.findOne({ where: { symbol: stock.symbol } });
  //       if (!share) {
  //         throw new BadRequestException(`Stock symbol ${stock.symbol} not found.`);
  //       }

  //       updatedBalance -= parseFloat(stock.price) * stock.quantity;
  //     }

  //     portfolio.balance = updatedBalance;
  //     await portfolio.save();
  //   }

  //   return [updatedCount, updatedPortfolios];
  // }

  async deletePortfolio(id: number): Promise<number> {
    return this.portfolioModel.destroy({ where: { id } });
  }
}

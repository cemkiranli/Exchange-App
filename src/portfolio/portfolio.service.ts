import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Portfolio } from '../models/portfolio.model';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class PortfolioService {

  constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(Portfolio) private readonly portfolioModel: typeof Portfolio,
    ) {}

    async createPortfolio(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
      const userExists = await this.userModel.findByPk(createPortfolioDto.userId);
  
      if (!userExists) {
        throw new BadRequestException('User not found.');
      }
  
      const existingPortfolio = await this.portfolioModel.findOne({
        where: {
          userId: createPortfolioDto.userId,
          name: createPortfolioDto.name
        }
      });
  
      if (existingPortfolio) {
        throw new BadRequestException('A portfolio with this name already exists. Please choose a different name.');
      }
  
      return this.portfolioModel.create({
        userId: createPortfolioDto.userId,
        name: createPortfolioDto.name,
        stocks: createPortfolioDto.stocks,
      });
  }
  

  async getAllPortfolios(): Promise<Portfolio[]> {
    return this.portfolioModel.findAll();
  }

  async getPortfolioById(id: number): Promise<Portfolio> {
    const portfolio = await this.portfolioModel.findByPk(id);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found.');
    }
    return portfolio;
  }

  async updatePortfolio(id: number, updatePortfolioDto: UpdatePortfolioDto): Promise<Portfolio> {
    const [numberOfAffectedRows, [updatedPortfolio]] = await this.portfolioModel.update(updatePortfolioDto, { 
      where: { id }, 
      returning: true 
    });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('Portfolio not found.');
    }
    
    return updatedPortfolio;
  }

  async deletePortfolio(id: number): Promise<void> {
    const deletedCount = await this.portfolioModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException('Portfolio not found.');
    }
  }
}

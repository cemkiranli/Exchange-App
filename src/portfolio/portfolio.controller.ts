import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.createPortfolio(createPortfolioDto);
  }

  @Get()
  async findAll(@Query('userId') userId: number) {
    return this.portfolioService.getAllPortfolios(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.portfolioService.getPortfolioById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioService.updatePortfolio(id, updatePortfolioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.portfolioService.deletePortfolio(id);
  }
}

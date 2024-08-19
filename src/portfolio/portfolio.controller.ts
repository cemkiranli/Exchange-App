import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.createPortfolio(createPortfolioDto);
  }

  @Get()
  async findAll() {
    return this.portfolioService.getAllPortfolios();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.portfolioService.getPortfolioById(id);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.portfolioService.deletePortfolio(id);
  }
}

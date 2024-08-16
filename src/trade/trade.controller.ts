import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/trade.dto';
import { Trade } from '../models/trade.model';

@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  async createTrade(@Body() createTradeDto: CreateTradeDto): Promise<Trade> {
    try {
      return await this.tradeService.createTrade(createTradeDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}

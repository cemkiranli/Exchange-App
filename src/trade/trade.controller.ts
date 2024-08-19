import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/trade.dto';

@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('buy')
  async buy(@Body() createTradeDto: CreateTradeDto) {
    try {
      return await this.tradeService.buyShares(createTradeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('sell')
  async sell(@Body() createTradeDto: CreateTradeDto) {
    try {
      return await this.tradeService.sellShares(createTradeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

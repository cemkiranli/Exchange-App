import { IsInt, IsNotEmpty, IsEnum, IsNumber, IsDate, Min, Max } from 'class-validator';

export class CreateTradeDto {
  @IsInt()
  @IsNotEmpty()
  portfolioId: number;

  @IsInt()
  @IsNotEmpty()
  shareId: number;

  @IsEnum(['BUY', 'SELL'])
  @IsNotEmpty()
  type: 'BUY' | 'SELL';

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be a positive number.' })
  price: number;

  @IsDate()
  @IsNotEmpty()
  tradeDate: Date;
}

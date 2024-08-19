import { IsInt, IsNotEmpty, IsString, IsEnum, IsNumber, IsPositive, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTradeDto {
  @IsInt()
  @IsNotEmpty()
  portfolioId: number;  

  @IsString()
  @IsNotEmpty()
  @Length(3, 3) 
  symbol: string; 

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity: number;  

  @IsEnum(['BUY', 'SELL'])
  @IsNotEmpty()
  type: 'BUY' | 'SELL'; 
}

export class TradeDto {
  @IsNumber()
  @IsPositive()
  portfolioId: number;

  @IsString()
  symbol: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

}



import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsDecimal,
  Matches,
  Length,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class Stock {
  @IsString()
  @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' })
  @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' })
  symbol: string;

  @IsInt()
  quantity: number;

  @IsDecimal({ decimal_digits: '0,2', force_decimal: false }, { message: 'Price can have a maximum of 2 decimal places.' })
  price: string;
}

export class CreatePortfolioDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  balance?: number = 500;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Stock)
  @IsOptional()
  stocks?: Stock[];
}

export class UpdatePortfolioDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  balance?: number = 500;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Stock)
  @IsOptional()
  stocks?: Stock[];
}

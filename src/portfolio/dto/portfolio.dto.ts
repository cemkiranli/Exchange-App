import { 
    IsInt, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    IsNumber, 
    IsArray,
    IsDecimal, 
    ValidateNested, 
    Matches, 
    Length, 
} from 'class-validator';
import { Type } from 'class-transformer';

class Stock {
    @IsString()
    @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' }) 
    @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' }) 
    symbol: string; 
    
    @IsInt({ message: 'Quantity must be an integer.' }) 
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
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Stock)
    stocks?: Stock[];
  }
  

  export class UpdatePortfolioDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Stock)
    stocks?: Stock[];
  }
  

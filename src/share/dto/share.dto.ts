import { IsString, IsNumber, IsNotEmpty, IsDecimal, Length, Matches, IsOptional } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' }) 
  @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' })
  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'Price must have exactly 2 decimal places.' })
  price: number;
}

export class UpdateShareDto {
    @IsOptional()
    @IsString()
    @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' }) 
    @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' })
    symbol?: string;
  
    @IsOptional()
    @IsNumber()
    @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'Price must have exactly 2 decimal places.' })
    price?: number;
  }

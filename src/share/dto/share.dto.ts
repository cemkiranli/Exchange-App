import { IsString, IsNumber, IsNotEmpty, IsPositive, Length, Matches, IsOptional, IsDate } from 'class-validator';

export class CreateShareDto {
  @IsString()
  @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' }) 
  @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' })
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number.' })
  @IsPositive({ message: 'Price must be positive.' })
  price: number;

  @IsOptional()
  @IsDate()
  lastUpdated?: Date;
}

export class UpdateShareDto {
    @IsOptional()
    @IsString()
    @Length(3, 3, { message: 'Symbol must be exactly 3 characters long.' }) 
    @Matches(/^[A-Z]+$/, { message: 'Symbol must be uppercase letters only.' })
    symbol?: string;
  
    @IsNotEmpty()
    @IsNumber({}, { message: 'Price must be a number.' })
    @IsPositive({ message: 'Price must be positive.' })
    price: number;
  }

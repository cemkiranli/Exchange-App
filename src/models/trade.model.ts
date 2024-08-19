import { 
  Column, 
  Model, 
  Table, 
  DataType, 
  ForeignKey, 
  BelongsTo 
} from 'sequelize-typescript';
import { Portfolio } from './portfolio.model';
import { Share } from './share.model';

@Table({ tableName: 'trades' })
export class Trade extends Model<Trade> {
@ForeignKey(() => Portfolio)
@Column({
  type: DataType.INTEGER,
  allowNull: false,
})
portfolioId: number;

@ForeignKey(() => Share)
@Column({
  type: DataType.STRING(3),
  allowNull: false,
})
symbol: string;

@Column({
  type: DataType.INTEGER,
  allowNull: false,
})
quantity: number;

@Column({
  type: DataType.DECIMAL(10, 2),
  allowNull: false,
})
price: number;

@Column({
  type: DataType.DECIMAL(10, 2),
  allowNull: false,
})
totalPrice: number;

@Column({
  type: DataType.ENUM('BUY', 'SELL'),
  allowNull: false,
})
type: string;

@BelongsTo(() => Portfolio)
portfolio: Portfolio;
}

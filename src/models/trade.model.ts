import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  shareId: number;

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
  type: 'BUY' | 'SELL';
}

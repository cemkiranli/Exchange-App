import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Portfolio } from './portfolio.model';

@Table({ tableName: 'stocks' })
export class Stock extends Model<Stock> {
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  portfolioId: number;

  @Column({
    type: DataType.STRING,
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

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;
}

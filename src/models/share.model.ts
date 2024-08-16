import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'shares' })
export class Share extends Model<Share> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  symbol: string;

  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Column(DataType.DATE)
  lastUpdated: Date;
}

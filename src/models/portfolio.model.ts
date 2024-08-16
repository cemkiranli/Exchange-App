import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsTo(() => User)
  user: User;
}

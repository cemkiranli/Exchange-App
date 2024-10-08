import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async register(username: string, password: string, email: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ username, password: hashedPassword, email });
  }

}

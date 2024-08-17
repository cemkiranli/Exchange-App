import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('A user with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userModel.create({ username, password: hashedPassword, email });
  }
}

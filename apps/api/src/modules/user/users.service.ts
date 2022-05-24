import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { argon2id, hash } from 'argon2';
// types
import { User, UserModel } from './interfaces/user.interface';
import { UserResponse } from './dto/user-response.dto';
import { CreateUserInput } from './dto/create-user-input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserModel>
  ) {}

  async userCount(): Promise<number> {
    return await this.userModel.count({});
  }

  async findById(id: string): Promise<UserResponse> {
    try {
      const user: User = await this.userModel.findById(id).exec();

      if (user) return { user };

      return { errors: [{ field: 'app', message: 'User (Id) not found.' }] };
    } catch (err) {
      if (err.kind === 'ObjectId')
        return {
          errors: [{ field: 'app', message: 'Id must be of type ObjectId.' }],
        };

      throw err;
    }
  }

  async findOneByUsername(username: string): Promise<UserResponse> {
    const user = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();

    if (user) return { user };

    return {
      errors: [{ field: 'app', message: 'User (Username) not found.' }],
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create({ username, password }: CreateUserInput): Promise<UserResponse> {
    const hashedPassword = await hash(password, { type: argon2id });

    const createdUser = new this.userModel({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    const user = await createdUser.save();
    return { user };
  }

  async updateOne(userId: string): Promise<User> {
    return await new this.userModel(userId).save();
  }
}

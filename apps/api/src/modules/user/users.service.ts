import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
// types
import { User, UserModel } from '@fm/nest/user/interface';
import { CreateUserResponse, CreateUserInput } from '@fm/nest/user/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserModel>
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async count(): Promise<number> {
    return await this.userModel.count();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  /**
   * ! DO NOT USE ON RESOLVERS OR CONTROLLERS !
   * @returns User with hashed password.
   */
  async findOneByUsername_UNSAFE(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).select('+password');
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createOne({
    username,
    password,
  }: CreateUserInput): Promise<CreateUserResponse> {
    try {
      const salt: string = await bcrypt.genSalt(12);
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        salt: Buffer.from(salt),
      });

      const user = await this.userModel.create({
        username: username.toLowerCase(),
        password: hashedPassword,
      });

      if (user) return { success: true };
      return {
        errors: [
          {
            field: 'username',
            message: 'Signup failed. please try again later.',
          },
        ],
      };
    } catch (error) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Signup failed. please try again later.',
          },
        ],
      };
    }
  }

  async updateOne(userId: string): Promise<User> {
    return await new this.userModel(userId).save();
  }
}

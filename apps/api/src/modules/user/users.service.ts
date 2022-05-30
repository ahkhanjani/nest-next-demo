import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { argon2id, hash } from 'argon2';
// types
import { User, UserModel } from '@fm/nest/user/interface';
import { UserResponse, CreateUserInput } from '@fm/nest/user/dto';

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

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createOne({
    username,
    password,
  }: CreateUserInput): Promise<UserResponse> {
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

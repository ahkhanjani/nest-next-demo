import { Args, Resolver, Query, Mutation, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '@fm/nest/user/interface';
import { CreateUserInput, CreateUserResponse } from '@fm/nest/user/dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => Number, { name: 'userCount' })
  async getUserCount(): Promise<number> {
    return await this.usersService.count();
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args('dto', { type: () => CreateUserInput }) dto: CreateUserInput
  ): Promise<CreateUserResponse> {
    return await this.usersService.createOne(dto);
  }
}

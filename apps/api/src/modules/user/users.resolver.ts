import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInput } from './dto/create-user-input.dto';
import { User } from './interfaces/user.interface';
import { UserResponse } from './dto/user-response.dto';

const pubSub = new PubSub();

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => Number, { name: 'userCount' })
  async getUserCount(): Promise<number> {
    return await this.usersService.userCount();
  }

  @Query(() => UserResponse, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<UserResponse> {
    return await this.usersService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => UserResponse)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<UserResponse> {
    const res = await this.usersService.create(input);

    // subscribe
    res.user && pubSub.publish('userCreated', { userCreated: res.user });

    return res;
  }

  //
  // ─── SUBSCRIPTION ───────────────────────────────────────────────────────────────
  //

  @Subscription(() => User, {
    name: 'userCreated',
  })
  createUserHandler() {
    return pubSub.asyncIterator('userCreated');
  }
}

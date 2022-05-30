import {
  Args,
  Resolver,
  Query,
  Mutation,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@fm/nest/user/interface';
import { CreateUserInput, UserResponse } from '@fm/nest/user/dto';

const pubSub = new PubSub();

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
  async getUser(@Args({ type: () => ID }) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => UserResponse)
  async createUser(
    @Args({ type: () => CreateUserInput }) dto: CreateUserInput
  ): Promise<UserResponse> {
    const res = await this.usersService.createOne(dto);

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

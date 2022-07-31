import { Session } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Session() session: Record<string, string>,
    @Args('dto') { username, password }: LoginInput
  ): Promise<LoginResponse> {
    const { userId, errors } = await this.authService.validate(
      username,
      password
    );

    if (errors) return { errors };

    session.userId = userId;

    return { success: true };
  }
}

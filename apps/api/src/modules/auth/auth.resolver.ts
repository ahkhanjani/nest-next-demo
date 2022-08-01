import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';

import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @User() uid: string,
    @Args('dto') { username, password }: LoginInput
  ): Promise<LoginResponse> {
    const { userId, errors } = await this.authService.validate(
      username,
      password
    );

    if (errors) return { errors };

    uid = userId;

    return { accessToken: uid };
  }
}

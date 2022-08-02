import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('dto') { username, password }: LoginInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Context() ctx: any
  ): Promise<LoginResponse> {
    const { userId, errors } = await this.authService.validate(
      username,
      password
    );

    if (errors) return { errors };

    ctx.req.session.userId = userId;

    return { accessToken: userId };
  }
}

import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Context() context: any,
    @Args('dto') { username, password }: LoginInput,
  ): Promise<LoginResponse> {
    if (context.req.session.userId)
      return { errors: [{ field: 'username', message: 'Already logged in.' }] };

    const { userId, errors } = await this.authService.validateUser(
      username,
      password,
    );

    if (errors) return { errors };

    context.req.session.userId = userId;

    return { accessToken: userId };
  }
}

import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CurrentUser } from './decorator/user.decorator';

import { AuthService } from './auth.service';

import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './dto/login-response.dto';
import { GqlAuthGuard } from './guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @CurrentUser() uid: string,
    @Context() ctx: any,
    @Args('dto') { username, password }: LoginInput
  ): Promise<LoginResponse> {
    if (uid)
      return { errors: [{ field: 'username', message: 'Already logged in.' }] };

    const { userId, errors } = await this.authService.validate(
      username,
      password
    );

    if (errors) return { errors };

    ctx.req.session.userId = userId;

    return { accessToken: userId };
  }
}

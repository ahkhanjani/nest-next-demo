import { Resolver, Mutation, Args } from '@nestjs/graphql';
// module
import { AuthService } from './auth.service';
import { LoginInput } from './auth/dto/login-input.dto';
import { TokenResponse } from './auth/dto/token-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => TokenResponse)
  async login(
    @Args('dto') { username, password }: LoginInput
  ): Promise<TokenResponse> {
    const { userId, errors } = await this.authService.validateLogin(
      username,
      password
    );

    if (errors) return { errors };
    return { token: this.authService.login(userId, username) };
  }
}

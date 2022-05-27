import { Resolver, Mutation, Args } from '@nestjs/graphql';
// dto
import { LoginInput, TokenResponse } from '@fm/nest/auth/dto';
// module
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => TokenResponse)
  async login(
    @Args('input') { username, password }: LoginInput
  ): Promise<TokenResponse> {
    try {
      const { user, errors } = await this.authService.validateLogin(
        username,
        password
      );

      if (errors) return { errors };
      return { token: this.authService.login(user) };
    } catch (err) {
      throw err;
    }
  }
}

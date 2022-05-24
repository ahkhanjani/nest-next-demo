import { Resolver, Mutation, Args } from '@nestjs/graphql';
// inputs
import { LoginInput } from 'src/modules/auth/inputs/login.input';
import { AuthService } from './auth.service';
import { TokenResponse } from './interfaces/token-response.interface';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //! ________________ query ________________

  //! ________________ mutation ________________

  @Mutation(() => TokenResponse)
  async login(
    @Args('input') { username, password }: LoginInput,
  ): Promise<TokenResponse> {
    try {
      const { user, errors } = await this.authService.validateLogin(
        username,
        password,
      );

      if (errors) return { errors };
      return { token: this.authService.login(user) };
    } catch (err) {
      throw err;
    }
  }
}

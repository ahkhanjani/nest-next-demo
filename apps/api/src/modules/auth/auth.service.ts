import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as argon2 from 'argon2';
import { User } from '../user/interface/user.interface';
// module
import { UsersService } from '../user/users.service';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateLogin(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const user: User = await this.usersService.findOneByUsername_UNSAFE(
      username
    );

    if (user) {
      const passwordsMatch: boolean = await argon2.verify(
        user.password,
        password
      );

      if (passwordsMatch)
        return {
          userId: user.id,
        };

      return {
        errors: [{ field: 'password', message: 'Password is incorrect.' }],
      };
    }

    return { errors: [{ field: 'username', message: 'Username not found.' }] };
  }

  login(userId: string, username: string): string {
    const payload = { username, sub: userId };
    return this.jwtService.sign(payload);
  }
}

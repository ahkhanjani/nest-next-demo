/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from '../user/users.service';
import { verify } from 'argon2';
import { FieldError } from '../../app/interfaces/field-error.interface';
import { User } from '../user/interfaces/user.interface';
import { UserResponse } from '../user/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const errors: FieldError[] = [];
    const { user }: UserResponse = await this.usersService.findOneByUsername(
      username,
    );

    if (user) {
      const passwordsMatch = await verify(user.password, password);

      if (passwordsMatch) {
        return {
          user: {
            id: user.id,
            createdAt: user.createdAt,
            username: user.username,
          },
        };
      }

      errors.push({ field: 'password', message: 'Password is incorrect.' });

      return { errors };
    }

    errors.push({ field: 'username', message: 'Username not found.' });

    return { errors };
  }

  login(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}

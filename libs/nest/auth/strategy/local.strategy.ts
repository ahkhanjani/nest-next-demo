import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@fm/api/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(username: string, password: string): Promise<User> {
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user)
  //     throw new UnauthorizedException('Username or Password are incorrect');

  //   return user;
  // }
}

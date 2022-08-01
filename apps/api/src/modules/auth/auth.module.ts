import { Module } from '@nestjs/common';
// modules
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    AuthController,
    // FacebookStrategy,
    // GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

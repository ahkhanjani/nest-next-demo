import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
// modules
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
// strategies
import {
  LocalStrategy,
  // FacebookStrategy,
  // GoogleStrategy,
} from './strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(),
  ],
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

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
// modules
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/user/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
// strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { FacebookStrategy } from './strategies/facebook.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // FacebookStrategy,
    // GoogleStrategy,
    AuthResolver,
    AuthController,
  ],
  exports: [AuthService],
})
export class AuthModule {}

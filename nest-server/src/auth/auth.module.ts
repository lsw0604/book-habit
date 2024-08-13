import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessStrategy } from './strategies/access.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'access' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET_ACCESS_KEY'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, AccessStrategy],
  exports: [AuthService],
})
export class AuthModule {}

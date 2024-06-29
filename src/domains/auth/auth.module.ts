import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@/shared/config';
import { UserService } from '@/domains/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

const ConfiguredJwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('jwtSecret'),
      signOptions: {
        expiresIn: configService.get('jwtExpiresIn'),
      },
    };
  },
});

@Module({
  imports: [PassportModule, ConfiguredJwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAuthStrategy],
})
export class AuthModule {}

import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ConfigModule } from '@/shared/config';
import { PrismaModule } from '@/shared/prisma';
import { AuthModule } from '@/domains/auth/auth.module';
import { UserModule } from '@/domains/user/user.module';

@Module({
  imports: [ConfigModule, PrismaModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

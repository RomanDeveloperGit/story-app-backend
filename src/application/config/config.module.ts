import { Global, Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

import { configFactory } from './config.factory';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    _ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

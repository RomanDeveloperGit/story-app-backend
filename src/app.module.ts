import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { UserModule } from './mod';

@Module({
  imports: [ConfigModule, UserModule],
})
export class AppModule {}

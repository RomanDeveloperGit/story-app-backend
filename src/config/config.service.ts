import { Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';

import { Config } from './config.interface';

@Injectable()
export class ConfigService extends _ConfigService<Config> {}

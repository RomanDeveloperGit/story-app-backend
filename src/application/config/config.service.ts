import { Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';

import { Config } from '@/core/config/model';

@Injectable()
export class ConfigService extends _ConfigService<Config> {}

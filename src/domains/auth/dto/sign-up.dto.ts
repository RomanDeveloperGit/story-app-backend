import { CreateUserRequest, CreateUserResponse } from '@/domains/user/dto/createUser.dto';

import { LogInResponse } from './log-in.dto';

export class SignUpRequest extends CreateUserRequest {}

export class SignUpResponse {
  user: CreateUserResponse;
  auth: LogInResponse;
}

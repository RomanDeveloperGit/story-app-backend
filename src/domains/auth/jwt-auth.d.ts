/* eslint-disable @typescript-eslint/no-empty-interface */

import { JwtPayload } from 'jsonwebtoken';

import { LogInRequest } from './dto/log-in.dto';

declare global {
  interface JwtServicePayload extends JwtPayload {}
  interface JwtUserPayload extends InstanceType<typeof LogInRequest> {}
  interface JwtFullPayload extends JwtServicePayload, JwtUserPayload {}

  type ExtendedRequest = Request & { user: JwtUserPayload };
}

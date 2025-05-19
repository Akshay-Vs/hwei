// @decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '@interfaces/Request';

export const User = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});

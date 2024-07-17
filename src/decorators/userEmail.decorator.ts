import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const UserEmail = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
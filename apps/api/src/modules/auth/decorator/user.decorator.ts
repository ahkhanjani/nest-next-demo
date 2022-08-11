import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    if (context.getType() === 'http')
      return context.switchToHttp().getRequest().session.uid;

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.session.uid;
  },
);

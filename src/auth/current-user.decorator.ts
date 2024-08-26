import { createParamDecorator } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { UserPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContextHost) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)

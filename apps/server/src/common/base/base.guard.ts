import { User } from '@clerk/backend';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ZodType, z } from 'zod';

export class BaseGuards {
  protected userGuard(user: User) {
    if (!user) throw new UnauthorizedException('User not found');
  }

  protected zodGuard<T extends ZodType<any, any, any>>(
    schema: T,
    fields: unknown,
  ): z.SafeParseSuccess<T> {
    const result = schema.safeParse(fields);

    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const key = issue.path.join('.') || 'form'; // fallback if path is empty
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }

      throw new BadRequestException({
        message: 'Validation failed',
        errors,
      });
    }

    return result;
  }
}

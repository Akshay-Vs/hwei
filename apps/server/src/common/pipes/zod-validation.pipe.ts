import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    try {
      Logger.debug(
        `Parsing object ${JSON.stringify(value, null, 2)}`,
        'ZodValidation',
      );
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErrors: Record<string, string> = {};

        for (const issue of err.issues) {
          const key = issue.path.join('.') || 'form';
          if (!zodErrors[key]) {
            zodErrors[key] = issue.message;
          }
        }
        Logger.debug(err.issues, 'ZodValidation');
        throw new BadRequestException({
          error: 'Validation failed',
          issues: zodErrors,
        });
      }
      throw new InternalServerErrorException('Validation failed');
    }
  }
}

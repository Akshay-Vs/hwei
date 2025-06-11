import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@/generated/runtime/library';
import { formatUniqueConstraintError } from 'src/common/utils/format-unique-constrain-error';

interface InternalErrorHandlerProps {
  error: unknown;
  entity: string;
  logger: Logger;
}

export const handleInternalError = ({
  error,
  entity,
  logger,
}: InternalErrorHandlerProps): never => {
  if (error == null) {
    logger.error(
      'An error occurred, but the error object is null',
      'InternalErrorHandler',
    );
    throw new InternalServerErrorException(`Operation failed unexpectedly`);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (process.env.NODE_ENV?.toLowerCase() === 'production') {
      logger.error(`[Prisma ${error.code}] : ${error.message}`);
    } else {
      logger.error(`[Prisma ${error.code}] : ${error.message}`, error.stack);
    }

    switch (error.code) {
      case 'P2002': {
        const target = error.meta?.target;
        throw new ConflictException(
          formatUniqueConstraintError(entity, target),
        );
      }
      case 'P2025':
        throw new NotFoundException(`${entity} not found`);
      case 'P2003':
        throw new BadRequestException(
          `Operation failed due to an invalid reference`,
        );
      case 'P2014':
        throw new BadRequestException(
          `Operation failed due to a relation error`,
        );
      default:
        throw new InternalServerErrorException(
          `Operation could not be completed`,
        );
    }
  } else if (error instanceof Error) {
    logger.error(`[Error] : ${error.message}`, error.stack);
    throw new InternalServerErrorException(
      `Operation failed due to an internal error`,
    );
  }

  logger.error(`[Unknown] : ${JSON.stringify(error)}`);
  throw new InternalServerErrorException(`Operation failed unexpectedly`);
};

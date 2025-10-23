import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@/generated/runtime/library';
import { formatUniqueConstraintError } from 'src/common/utils/format-unique-constrain-error';
import { InternalErrorHandlerProps } from '../types/internal-handler-props';
import { formatForeignKeyError } from '../utils/format-foriegn-key-error';
import { formatDependencyError } from '../utils/format-dependency-error';

export const handleInternalError = ({
  error,
  entity,
  logger,
  operation = 'operation',
}: InternalErrorHandlerProps): never => {
  if (error == null) {
    logger.error(
      'An error occurred, but the error object is null',
      'InternalErrorHandler',
    );
    throw new InternalServerErrorException(`Operation failed unexpectedly`);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    const logMessage = `[Prisma ${error.code}] : ${error.message}`;

    if (process.env.NODE_ENV?.toLowerCase() === 'production') {
      logger.error(logMessage);
    } else {
      logger.error(logMessage, error.stack);
    }

    switch (error.code) {
      // Unique constraint violation
      case 'P2002': {
        const target = error.meta?.target;
        throw new ConflictException(
          formatUniqueConstraintError(entity, target),
        );
      }

      // Record not found
      case 'P2025':
        throw new NotFoundException(`${entity} not found`);

      // Foreign key constraint failed (invalid reference)
      case 'P2003':
        throw new BadRequestException(
          formatForeignKeyError(entity, error.meta, error.message),
        );

      // Required relation violation (cascading delete failure)
      case 'P2014':
        throw new BadRequestException(
          `Cannot ${operation} ${entity} because it would violate a required relation`,
        );

      // Related record not found
      case 'P2015':
        throw new NotFoundException(
          `Cannot perform operation: related record not found`,
        );

      // Dependent records exist (cannot delete due to dependencies)
      case 'P2023':
        throw new ConflictException(formatDependencyError(entity, error.meta));

      // Value too long for column type
      case 'P2000':
        throw new BadRequestException(
          `Value provided for ${entity} exceeds maximum length`,
        );

      // Record required but not found (null constraint violation)
      case 'P2011':
        throw new BadRequestException(
          `Operation failed: required field is missing in ${entity}`,
        );

      // Missing required value
      case 'P2012':
        throw new BadRequestException(
          `Operation failed: missing required value for ${entity}`,
        );

      // Missing required field
      case 'P2013':
        throw new BadRequestException(
          `Operation failed: missing required field in ${entity}`,
        );

      // Default case for unhandled Prisma errors
      default:
        logger.warn(`Unhandled Prisma error code: ${error.code}`);
        throw new InternalServerErrorException(
          `Operation could not be completed`,
        );
    }
  } else if (error instanceof HttpException) {
    const errorMessage = error.message;
    const errorStack = error.stack;

    logger.error(`[HttpException] : ${errorMessage}`, errorStack);

    // Re-throw the original HttpException to preserve status code and message
    // unless you want to override it
    throw error;
  }

  // Unknown error type
  const errorMessage =
    error instanceof Error ? error.message : JSON.stringify(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  logger.error(`[Unknown Error] : ${errorMessage}`, errorStack);
  throw new InternalServerErrorException(`Operation failed unexpectedly`);
};

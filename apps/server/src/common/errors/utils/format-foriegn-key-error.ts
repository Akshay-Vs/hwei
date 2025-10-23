import { PrismaErrorMeta } from '../types/prisma-meta';
import { extractFieldFromConstraint } from './extracts';

/**
 * Extracts and formats the foreign key field name from Prisma error metadata
 */
export const formatForeignKeyError = (
  entity: string,
  meta?: PrismaErrorMeta,
  message?: string,
): string => {
  // Try to extract field from constraint in error metadata or message
  let fieldName = meta?.field_name;
  const constraint =
    meta?.constraint ?? message?.match(/constraint: `([^`]+)`/)?.[1];

  if (!fieldName && constraint) {
    fieldName = extractFieldFromConstraint(constraint) || undefined;
  }

  const modelName = meta?.model_name;

  if (fieldName && modelName) {
    return `Invalid ${fieldName}: The referenced ${modelName} does not exist`;
  }

  if (fieldName) {
    return `Invalid ${fieldName}: The referenced record does not exist`;
  }

  if (modelName) {
    return `Cannot perform operation on ${entity} because it references a non-existent ${modelName}`;
  }

  return `Cannot perform operation on ${entity} due to invalid foreign key reference`;
};

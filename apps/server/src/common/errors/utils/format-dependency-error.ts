import { PrismaErrorMeta } from '../types/prisma-meta';

/**
 * Formats error message for records that cannot be deleted due to dependencies
 */
export const formatDependencyError = (
  entity: string,
  meta?: PrismaErrorMeta,
): string => {
  const fieldName = meta?.field_name;
  const modelName = meta?.model_name;

  if (fieldName && modelName) {
    return `Cannot delete ${entity} because it is referenced by existing ${modelName} records in ${fieldName}`;
  }

  if (modelName) {
    return `Cannot delete ${entity} because it is referenced by existing ${modelName} records`;
  }

  return `Cannot delete ${entity} because it is still referenced by other records`;
};

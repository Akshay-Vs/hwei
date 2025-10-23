/**
 * Extracts field name from constraint string
 * Example: "Product_brandId_fkey" -> "brandId"
 */
export const extractFieldFromConstraint = (
  constraint?: string,
): string | null => {
  if (!constraint) return null;

  // Pattern: ModelName_fieldName_fkey or ModelName_fieldName_key
  const match = constraint.match(/_([a-zA-Z0-9]+)_(?:fkey|key)$/);
  return match?.[1] ?? null;
};

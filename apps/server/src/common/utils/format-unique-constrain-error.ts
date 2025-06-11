/**
 * Formats a user-friendly unique constraint violation message.
 *
 * @param entity - The name of the entity (e.g., 'Brand', 'Product').
 * @param target - The target field(s) causing the unique constraint violation.
 * @returns A readable error message.
 */
export function formatUniqueConstraintError(
  entity: string,
  target: unknown,
): string {
  let fields: string[] = [];

  if (Array.isArray(target)) {
    fields = target.filter((item): item is string => typeof item === 'string');
  } else if (typeof target === 'string') {
    try {
      const parsed = JSON.parse(target) as unknown;
      if (Array.isArray(parsed)) {
        fields = parsed.filter(
          (item): item is string => typeof item === 'string',
        );
      } else if (typeof parsed === 'string') {
        fields = [parsed];
      } else {
        fields = [target];
      }
    } catch {
      fields = [target];
    }
  }

  const fieldList =
    fields.length === 1
      ? fields[0]
      : fields.length === 2
        ? `${fields[0]} and ${fields[1]}`
        : `${fields.slice(0, -1).join(', ')} and ${fields[fields.length - 1]}`;

  return `${entity} with the same ${fieldList} already exists. These fields must be unique.`;
}

export interface PrismaErrorMeta {
  field_name?: string;
  model_name?: string;
  target?: string | string[];
  constraint?: string;
  [key: string]: unknown;
}

import { Logger } from '@nestjs/common';

export interface InternalErrorHandlerProps {
  error: unknown;
  entity: string;
  logger: Logger;
  operation?: string;
}

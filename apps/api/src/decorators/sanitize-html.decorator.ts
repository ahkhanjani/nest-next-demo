import { SetMetadata } from '@nestjs/common';

export const SanitizeHtml = (...args: string[]) =>
  SetMetadata('sanitize-html', args);

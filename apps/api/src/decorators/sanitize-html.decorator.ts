import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export const SanitizeHtml = (input: string) =>
  applyDecorators(Transform(() => sanitizeHtml(input)));

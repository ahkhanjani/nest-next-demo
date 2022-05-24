import { Injectable } from '@nestjs/common';
import { materialFormSchemaArray } from './schemas';

@Injectable()
export class MaterialFormSchemasService {
  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  getMaterialSchemaArray(): string {
    return JSON.stringify(materialFormSchemaArray);
  }
}

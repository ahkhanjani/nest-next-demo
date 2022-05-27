import { Injectable } from '@nestjs/common';
import { materialFormSchemaArray } from '@fm/nest/material-form-schema/assets/schemas';

@Injectable()
export class MaterialFormSchemasService {
  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  getMaterialSchemaArray(): string {
    return JSON.stringify(materialFormSchemaArray);
  }
}

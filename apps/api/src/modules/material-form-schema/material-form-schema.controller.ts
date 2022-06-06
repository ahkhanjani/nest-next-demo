import { Controller, Get } from '@nestjs/common';
import { MaterialFormSchemasService } from './material-form-schemas.service';
import { MaterialFormSchema } from '@fm/nest/material-form-schema/interface/material-form-schema.interface';

@Controller(MaterialFormSchema.name)
export class MaterialFormSchemaController {
  constructor(
    private readonly materialFormSchemasService: MaterialFormSchemasService
  ) {}

  //
  // ─── GET ────────────────────────────────────────────────────────────────────────
  //

  @Get('schema-array')
  getMaterialFormSchemaArray(): string {
    return this.materialFormSchemasService.getMaterialSchemaArray();
  }
}

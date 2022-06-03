import { Controller, Get } from '@nestjs/common';
import { MaterialFormSchemasService } from './material-form-schemas.service';

@Controller('material-form-schema')
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

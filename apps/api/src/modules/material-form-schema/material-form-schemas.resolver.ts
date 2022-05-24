import { Query, Resolver } from '@nestjs/graphql';
// modules
import { MaterialFormSchemasService } from './material-form-schemas.service';

@Resolver()
export class MaterialFormSchemasResolver {
  constructor(
    private readonly materialFormSchemasService: MaterialFormSchemasService,
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => String, { name: 'materialSchemaArray' })
  getMaterialSchemaArray(): string {
    return this.materialFormSchemasService.getMaterialSchemaArray();
  }
}

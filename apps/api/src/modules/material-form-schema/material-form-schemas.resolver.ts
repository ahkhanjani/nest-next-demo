import { Query, Mutation, Resolver, Args, ID } from '@nestjs/graphql';
// modules
import { MaterialFormSchemasService } from './material-form-schemas.service';
// interface
import { MaterialFormSchema } from '@fm/nest/material-form-schema/interface/material-form-schema.interface';

@Resolver()
export class MaterialFormSchemasResolver {
  constructor(
    private readonly materialFormSchemasService: MaterialFormSchemasService
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => [MaterialFormSchema], { name: 'materialFormSchemas' })
  async getMaterialFormSchemas(): Promise<MaterialFormSchema[]> {
    return await this.materialFormSchemasService.findAll();
  }
  @Query(() => MaterialFormSchema, { name: 'materialFormSchema' })
  async getMaterialFormSchema(
    @Args('id', { type: () => ID }) id: string
  ): Promise<MaterialFormSchema> {
    return await this.materialFormSchemasService.findOne(id);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => Boolean)
  async deleteMaterialFormSchema(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.materialFormSchemasService.deleteOne(id);
  }
}

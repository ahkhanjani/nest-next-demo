import { Query, Mutation, Resolver, Args, ID } from '@nestjs/graphql';
import { MaterialFormSchema } from './interface/material-form-schema.interface';
// modules
import { MaterialFormSchemasService } from './material-form-schemas.service';
// interface

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

// nest
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
// modules
import { MaterialsService } from './materials.service';
// type
import { Material } from '@fm/nest/material/interface';
import {
  CreateMaterialsInput,
  GetMaterialsByCategoryIdInput,
  MaterialPaginateInput,
  MaterialPaginateResponse,
  UpdateMaterialInput,
  UpdateMaterialResponse,
  CreateMaterialsResponse,
} from '@fm/nest/material/dto';

@Resolver()
export class MaterialsResolver {
  constructor(private readonly materialsService: MaterialsService) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => MaterialPaginateResponse, { name: 'materialsPaginate' })
  async getMaterials_paginate(
    @Args('input', { type: () => MaterialPaginateInput })
    { limit, page, categoryId }: MaterialPaginateInput
  ): Promise<MaterialPaginateResponse> {
    const res = await this.materialsService.paginate({
      categoryId,
      page,
      limit,
    });
    return res;
  }

  @Query(() => [Material], { name: 'allMaterials' })
  async getAllMaterials(): Promise<Material[]> {
    return await this.materialsService.findAll();
  }

  @Query(() => Material, { name: 'materialById' })
  async getMaterialById(@Args('id') id: string): Promise<Material> {
    return await this.materialsService.findOneById(id);
  }

  /**
   * Searchs for any material with the given category id.
   * @param {{ categoryId: string }} input an object containing
   * `categoryId` of GraphQL type `ID`
   * @returns {Promise<Material[]>} An array of materials.
   */
  @Query(() => [Material], { name: 'materialsByCategoryId' })
  async getMaterialsByCategoryId(
    @Args('input') { categoryId }: GetMaterialsByCategoryIdInput
  ): Promise<Material[]> {
    const materials = await this.materialsService.findByCategoryId(categoryId);
    return materials;
  }

  @Query(() => Boolean, { name: 'materialTitleExists' })
  async checkMaterialTitleExists(
    @Args('title') title: string
  ): Promise<boolean> {
    return await this.materialsService.checkTitleExists(title);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => CreateMaterialsResponse)
  async createMaterials(
    @Args('input') { materialArray, category }: CreateMaterialsInput
  ): Promise<CreateMaterialsResponse> {
    const res = await this.materialsService.createMany(materialArray, category);
    return res;
  }

  @Mutation(() => UpdateMaterialResponse)
  async updateMaterial(
    @Args('input')
    { materialId, category, title, type, formData }: UpdateMaterialInput
  ): Promise<UpdateMaterialResponse> {
    return await this.materialsService.updateOne(
      materialId,
      category,
      title,
      type,
      formData
    );
  }
}

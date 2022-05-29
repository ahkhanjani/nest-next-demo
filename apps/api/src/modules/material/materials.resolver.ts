// nest
import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
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

  @Query(() => Material, { name: 'material' })
  async getMaterial(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Material> {
    return await this.materialsService.findOne(id);
  }

  @Query(() => [Material], { name: 'materials' })
  async getMaterials(): Promise<Material[]> {
    return await this.materialsService.findAll();
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

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => CreateMaterialsResponse)
  async createMaterials(
    @Args('input')
    { materialDataArray: materialArray, category }: CreateMaterialsInput
  ): Promise<CreateMaterialsResponse> {
    const res = await this.materialsService.createMany(category, materialArray);
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

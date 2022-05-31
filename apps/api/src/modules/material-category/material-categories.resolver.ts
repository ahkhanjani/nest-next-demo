import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  UpdateMaterialCategoryResponse,
  MaterialCategoryResponse,
  UpdateCategoryInput,
  CreateCategoryInput,
  PaginateResponse,
  PaginateInput,
} from '@fm/nest/material-categoy/dto';
import {
  GetCategoriesByParentIdInput,
  MaterialCategory,
} from '@fm/nest/material-categoy/interface';
// module
import { MaterialCategoriesService } from './material-categories.service';

@Resolver()
export class MaterialCategoriesResolver {
  constructor(
    private readonly materialCategoriesService: MaterialCategoriesService
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => PaginateResponse, { name: 'categoriesPaginate' })
  async getCategories_paginate(
    @Args('input', { type: () => PaginateInput })
    { limit, page, parentId }: PaginateInput
  ): Promise<PaginateResponse> {
    const res = await this.materialCategoriesService.paginate({
      parentId,
      page,
      limit,
    });
    return res;
  }

  @Query(() => [MaterialCategory], { name: 'allCategories' })
  async getAllCategories(): Promise<MaterialCategory[]> {
    return await this.materialCategoriesService.findAll();
  }

  @Query(() => [MaterialCategory], { name: 'categoriesByParentId' })
  async getCategoriesByParentId(
    @Args('input') { parentId }: GetCategoriesByParentIdInput
  ): Promise<MaterialCategory[]> {
    return await this.materialCategoriesService.findAllByParentId(parentId);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => MaterialCategoryResponse)
  async createCategory(
    @Args('dto', { type: () => CreateCategoryInput }) dto: CreateCategoryInput
  ): Promise<MaterialCategoryResponse> {
    console.log(dto);
    const category = await this.materialCategoriesService.create(dto);
    return category;
  }

  @Mutation(() => UpdateMaterialCategoryResponse)
  async updateCategory(
    @Args('dto', { type: () => UpdateCategoryInput })
    dto: UpdateCategoryInput
  ): Promise<UpdateMaterialCategoryResponse> {
    return await this.materialCategoriesService.updateOne(dto);
  }
}

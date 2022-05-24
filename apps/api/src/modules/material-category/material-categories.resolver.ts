import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput } from './dto/create-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category-input.dto';
import { MaterialCategoryResponse } from './dto/material-category-response.dto';
import { UpdateMaterialCategoryResponse } from './dto/update-response.dto';
import { GetCategoriesByParentIdInput } from './interfaces/get-categories-by-parentId-input.dto';
import { MaterialCategory } from './interfaces/material-category.interface';
// module
import { MaterialCategoriesService } from './material-categories.service';
import { PaginateResponse } from './dto/paginate-response.dto';
import { PaginateInput } from './dto/paginate-input.dto';

@Resolver()
export class MaterialCategoriesResolver {
  constructor(
    private readonly materialCategoriesService: MaterialCategoriesService,
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => PaginateResponse, { name: 'categoriesPaginate' })
  async getCategories_paginate(
    @Args('input', { type: () => PaginateInput })
    { limit, page, parentId }: PaginateInput,
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
    @Args('input') { parentId }: GetCategoriesByParentIdInput,
  ): Promise<MaterialCategory[]> {
    return await this.materialCategoriesService.findAllByParentId(parentId);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => MaterialCategoryResponse)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<MaterialCategoryResponse> {
    const category = await this.materialCategoriesService.create(input);
    return category;
  }

  @Mutation(() => UpdateMaterialCategoryResponse)
  async updateCategory(
    @Args('input') { id, title }: UpdateCategoryInput,
  ): Promise<UpdateMaterialCategoryResponse> {
    const res = await this.materialCategoriesService.updateOne({ id, title });
    return res;
  }
}

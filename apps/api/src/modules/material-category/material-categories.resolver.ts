import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMaterialCategoryInput } from './dto/create-material-category-input.dto';
import { CreateMaterialCategoryResponse } from './dto/create-material-category-response.dto';
import { MaterialCategoriesPaginateInput } from './dto/material-categories-paginate-input.dto';
import { MaterialCategoriesPaginateResponse } from './dto/material-categories-paginate-response.dto';
import { UpdateMaterialCategoryInput } from './dto/update-material-category-input.dto';
import { UpdateMaterialCategoryResponse } from './dto/update-material-category-response.dto';
import { MaterialCategory } from './interface/material-category.interface';
// module
import { MaterialCategoriesService } from './material-categories.service';

@Resolver()
export class MaterialCategoriesResolver {
  constructor(
    private readonly materialCategoriesService: MaterialCategoriesService,
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  @Query(() => MaterialCategoriesPaginateResponse, {
    name: 'materialCategoriesPaginate',
  })
  async getMaterialCategoriesPaginate(
    @Args('dto', { type: () => MaterialCategoriesPaginateInput })
    dto: MaterialCategoriesPaginateInput,
  ): Promise<MaterialCategoriesPaginateResponse> {
    return await this.materialCategoriesService.paginate(dto);
  }

  @Query(() => MaterialCategory, { name: 'materialCategory' })
  async getMaterialCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<MaterialCategory> {
    return await this.materialCategoriesService.findOne(id);
  }

  @Query(() => [MaterialCategory], { name: 'materialCategories' })
  async getMaterialCategories(): Promise<MaterialCategory[]> {
    return await this.materialCategoriesService.findAll();
  }

  @Query(() => [MaterialCategory], { name: 'materialCategoriesByParentId' })
  async getMaterialCategoriesByParentId(
    @Args('parentId', { type: () => ID, nullable: true }) parentId: string,
  ): Promise<MaterialCategory[]> {
    return await this.materialCategoriesService.findByParentId(parentId);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => CreateMaterialCategoryResponse)
  async createMaterialCategory(
    @Args('dto', { type: () => CreateMaterialCategoryInput })
    dto: CreateMaterialCategoryInput,
  ): Promise<CreateMaterialCategoryResponse> {
    return await this.materialCategoriesService.createOne(dto);
  }

  @Mutation(() => UpdateMaterialCategoryResponse)
  async updateMaterialCategory(
    @Args('dto', { type: () => UpdateMaterialCategoryInput })
    dto: UpdateMaterialCategoryInput,
  ): Promise<UpdateMaterialCategoryResponse> {
    return await this.materialCategoriesService.updateOne(dto);
  }
}

import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { CreateMaterialsInput } from './dto/create-materials-input.dto';
import { CreateMaterialsResponse } from './dto/create-materials-response.dto';
import { MaterialsPaginateInput } from './dto/paginate-input.dto';
import { MaterialsPaginateResponse } from './dto/paginate-response.dto';
import { UpdateMaterialInput } from './dto/update-material-input.dto';
import { UpdateMaterialResponse } from './dto/update-material-response.dto';
import { Material } from './interface/material.interface';
// module
import { MaterialsService } from './materials.service';

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
    const material: Material = await this.materialsService.findOne(id);
    return material;
  }

  @Query(() => [Material], { name: 'materials' })
  async getMaterials(): Promise<Material[]> {
    const materials: Material[] = await this.materialsService.findAll();
    return materials;
  }

  @Query(() => [Material], { name: 'materialsByCategoryId' })
  async getMaterialsByCategoryId(
    @Args('categoryId', { type: () => ID }) categoryId: string
  ): Promise<Material[]> {
    return await this.materialsService.findByCategoryId(categoryId);
  }

  @Query(() => [Material], { name: 'materialByTitle' })
  async getMaterialByTitle(@Args('title') title: string): Promise<Material> {
    return await this.materialsService.findOneByTitle(title);
  }

  @Query(() => Boolean, { name: 'materialTitleExists' })
  async checkMaterialTitleExists(
    @Args('title') title: string
  ): Promise<boolean> {
    return await this.materialsService.checkTitleExists(title);
  }

  @Query(() => MaterialsPaginateResponse)
  async materialsPaginate(
    @Args('dto', { type: () => MaterialsPaginateInput })
    dto: MaterialsPaginateInput
  ): Promise<MaterialsPaginateResponse> {
    const res = await this.materialsService.paginate(dto);
    return res;
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  @Mutation(() => CreateMaterialsResponse)
  async createMaterials(
    @Args('dto', { type: () => CreateMaterialsInput })
    dto: CreateMaterialsInput
  ): Promise<CreateMaterialsResponse> {
    return await this.materialsService.createMany(dto);
  }

  @Mutation(() => UpdateMaterialResponse)
  async updateMaterial(
    @Args('dto', { type: () => UpdateMaterialInput })
    dto: UpdateMaterialInput
  ): Promise<UpdateMaterialResponse> {
    return await this.materialsService.updateOne(dto);
  }
}

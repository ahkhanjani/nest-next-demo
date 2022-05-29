// nest
import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
// modules
import { MaterialsService } from './materials.service';
// type
import { Material } from '@fm/nest/material/interface';
import {
  CreateMaterialsInput,
  MaterialsPaginateInput,
  MaterialsPaginateResponse,
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
  async getMaterial(@Args({ type: () => ID }) id: string): Promise<Material> {
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
    @Args({ type: () => ID }) categoryId: string
  ): Promise<Material[]> {
    const materials: Material[] = await this.materialsService.findByCategoryId(
      categoryId
    );
    return materials;
  }

  @Query(() => Boolean, { name: 'materialTitleExists' })
  async checkMaterialTitleExists(
    @Args('title') title: string
  ): Promise<boolean> {
    return await this.materialsService.checkTitleExists(title);
  }

  @Query(() => MaterialsPaginateResponse)
  async materialsPaginate(
    @Args('input', { type: () => MaterialsPaginateInput })
    { limit, page, categoryId }: MaterialsPaginateInput
  ): Promise<MaterialsPaginateResponse> {
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
    @Args('dto')
    dto: UpdateMaterialInput
  ): Promise<UpdateMaterialResponse> {
    return await this.materialsService.updateOne(dto);
  }
}

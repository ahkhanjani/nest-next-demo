import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UpdateMaterialCategoryResponse,
  CreateMaterialCategoryResponse,
  UpdateMaterialCategoryInput,
  CreateMaterialCategoryInput,
  MaterialCategoriesPaginateInput,
  MaterialCategoriesPaginateResponse,
} from '@fm/nest/material-categoy/dto';
import {
  MaterialCategory,
  MaterialCategoryModel,
} from '@fm/nest/material-categoy/interface';

@Injectable()
export class MaterialCategoriesService {
  constructor(
    @InjectModel('material-categories')
    private readonly materialCategoryModel: Model<MaterialCategoryModel>
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async paginate({
    limit,
    page,
    parentId,
  }: MaterialCategoriesPaginateInput): Promise<MaterialCategoriesPaginateResponse> {
    const offset: number = (page - 1) * limit;
    const categories: MaterialCategory[] = await this.materialCategoryModel
      .find({ parentId })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);

    const categoriesCount: number = await this.materialCategoryModel.count({
      parentId,
    });
    const pagesCount: number = Math.ceil(categoriesCount / limit);

    return { materialCategories: categories, pagesCount };
  }

  async findAll(): Promise<MaterialCategory[]> {
    return await this.materialCategoryModel.find();
  }

  async findOne(id: string): Promise<MaterialCategory> {
    return await this.materialCategoryModel.findById(id);
  }

  /**
   * Searchs for a category with the same title AND parentId as the given category.
   * @param {{title: string, parentId: string}} dto Contains title and parentId.
   * @returns If an identical category is found, returns true.
   */
  async checkAlreadyExists(dto: CreateMaterialCategoryInput): Promise<boolean> {
    const found: MaterialCategory = await this.materialCategoryModel.findOne(
      dto
    );
    return Boolean(found);
  }

  async findByParentId(parentId: string): Promise<MaterialCategory[]> {
    return await this.materialCategoryModel.find({ parentId });
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createOne({
    title,
    parentId,
  }: CreateMaterialCategoryInput): Promise<CreateMaterialCategoryResponse> {
    // check if parent exists.
    if (parentId !== '') {
      const parentIdExists = Boolean(await this.findOne(parentId));
      if (!parentIdExists)
        return { message: 'The parent category does not exist.' };
    }

    const createdCategory = await this.materialCategoryModel.create({
      title,
      parentId,
    });

    return { materialCategory: createdCategory };
  }

  async updateOne({
    id,
    title,
  }: UpdateMaterialCategoryInput): Promise<UpdateMaterialCategoryResponse> {
    try {
      await this.materialCategoryModel.updateOne(
        {
          _id: id,
        },
        { $set: { title } }
      );

      return { success: true };
    } catch (error) {
      return { error };
    }
  }
}

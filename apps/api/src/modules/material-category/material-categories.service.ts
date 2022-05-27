import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UpdateMaterialCategoryResponse,
  MaterialCategoryResponse,
  UpdateCategoryInput,
  CreateCategoryInput,
  PaginateInput,
  PaginateResponse,
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
  }: PaginateInput): Promise<PaginateResponse> {
    const offset: number = (page - 1) * limit;
    const categories: MaterialCategory[] = await this.materialCategoryModel
      .find({ parentId })
      .sort([['_id', -1]])
      .skip(offset)
      .limit(limit)
      .exec();
    const categoriesCount: number = await this.materialCategoryModel.count({
      parentId,
    });
    const pagesCount: number = Math.ceil(categoriesCount / limit);

    return { categories, pagesCount };
  }

  async findAll(): Promise<MaterialCategory[]> {
    return await this.materialCategoryModel.find().exec();
  }

  async findOneById(id: string): Promise<MaterialCategory> {
    return await this.materialCategoryModel.findById({ _id: id }).exec();
  }

  /**
   * Searchs for a category with the same title AND parentId as the given category.
   * @param {{title: string, parentId: string}} input Contains title and parentId.
   * @returns If an identical category is found, returns the category.
   */
  async findOneIdentical(
    input: CreateCategoryInput
  ): Promise<MaterialCategory> {
    const category = await this.materialCategoryModel
      .findOne({ ...input })
      .exec();

    return category;
  }

  async findAllByParentId(parentId: string): Promise<MaterialCategory[]> {
    const found = await this.materialCategoryModel.find({ parentId }).exec();
    return found;
  }

  async findAllByDependsOnParentId(
    dependsOnParentId: string
  ): Promise<MaterialCategory[]> {
    return await this.materialCategoryModel.find({ dependsOnParentId }).exec();
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async create({
    title,
    parentId,
  }: CreateCategoryInput): Promise<MaterialCategoryResponse> {
    if (parentId !== '') {
      const parentIdExists = Boolean(await this.findOneById(parentId));
      if (!parentIdExists)
        return { message: 'The parent category does not exist.' };
    }

    const createdCategory = new this.materialCategoryModel({
      title,
      parentId,
    });
    const savedCategory = await createdCategory.save();

    return { category: savedCategory };
  }

  async updateOne({
    id,
    title,
  }: UpdateCategoryInput): Promise<UpdateMaterialCategoryResponse> {
    await this.materialCategoryModel
      .updateOne({ _id: id }, { $set: { title } })
      .exec();
    return { success: true };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// dto
import { CreateCategoryInput } from './dto/create-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category-input.dto';
import { MaterialCategoryResponse } from './dto/material-category-response.dto';
import { UpdateMaterialCategoryResponse } from './dto/update-response.dto';
// interfaces
import {
  MaterialCategory,
  MaterialCategoryModel,
} from './interfaces/material-category.interface';
import { PaginateInput } from './dto/paginate-input.dto';
import { PaginateResponse } from './dto/paginate-response.dto';

@Injectable()
export class MaterialCategoriesService {
  constructor(
    @InjectModel('material-categories')
    private readonly materialCategoryModel: Model<MaterialCategoryModel>,
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async paginate({
    limit,
    page,
    parentId,
  }: PaginateInput): Promise<PaginateResponse> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<MaterialCategory[]> {
    try {
      return await this.materialCategoryModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<MaterialCategory> {
    try {
      return await this.materialCategoryModel.findById({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Searchs for a category with the same title AND parentId as the given category.
   * @param {{title: string, parentId: string}} input Contains title and parentId.
   * @returns If an identical category is found, returns the category.
   */
  async findOneIdentical(
    input: CreateCategoryInput,
  ): Promise<MaterialCategory> {
    try {
      const category = await this.materialCategoryModel
        .findOne({ ...input })
        .exec();

      return category;
    } catch (err) {
      // TODO handle error in frontend
      throw err;
    }
  }

  async findAllByParentId(parentId: string): Promise<MaterialCategory[]> {
    try {
      const found = await this.materialCategoryModel.find({ parentId }).exec();
      return found;
    } catch (error) {
      throw error;
    }
  }

  async findAllByDependsOnParentId(
    dependsOnParentId: string,
  ): Promise<MaterialCategory[]> {
    try {
      return await this.materialCategoryModel
        .find({ dependsOnParentId })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async create({
    title,
    parentId,
  }: CreateCategoryInput): Promise<MaterialCategoryResponse> {
    try {
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
    } catch (error) {
      return { message: error };
    }
  }

  async updateOne({
    id,
    title,
  }: UpdateCategoryInput): Promise<UpdateMaterialCategoryResponse> {
    try {
      await this.materialCategoryModel
        .updateOne({ _id: id }, { $set: { title } })
        .exec();
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  }
}

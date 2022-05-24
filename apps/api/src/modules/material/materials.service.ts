import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// types
import { Material, MaterialModel } from './interfaces/material.interface';
import { CreateMaterialResponse } from './dto/create-material-response.dto';
import { UpdateMaterialResponse } from './dto/update-material-response.dto';
import { MaterialPaginateResponse } from './dto/paginate-response.dto';
import { MaterialPaginateInput } from './dto/paginate-input.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel('materials')
    private readonly materialModel: Model<MaterialModel>
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async paginate({
    limit,
    page,
    categoryId,
  }: MaterialPaginateInput): Promise<MaterialPaginateResponse> {
    try {
      const offset: number = (page - 1) * limit;
      const materials: Material[] = await this.materialModel
        .find({ category: categoryId })
        .sort([['_id', -1]])
        .skip(offset)
        .limit(limit)
        .exec();
      const materialsCount: number = await this.materialModel.count({
        categoryId,
      });
      const pagesCount: number = Math.ceil(materialsCount / limit);

      return { materials, pagesCount };
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Material> {
    try {
      return await this.materialModel.findOne({ id }).exec();
    } catch (err) {
      throw err;
    }
  }

  async findByCategoryId(categoryId: string): Promise<Material[]> {
    try {
      const found = await this.materialModel
        .find({ category: categoryId })
        .exec();
      return found;
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Material[]> {
    try {
      return await this.materialModel.find().exec();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Search for an existing material with the same title as user input.
   * @param {string} title This will be used to search for a duplicate title.
   * @returns {boolean} `true` if title already exists.
   */
  async checkTitleExists(title: string): Promise<boolean> {
    try {
      const existingMaterial = await this.materialModel
        .findOne({ title })
        .exec();

      return Boolean(existingMaterial);
    } catch (err) {
      throw err;
    }
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createMany(
    materialArray: string[],
    category: string[]
  ): Promise<CreateMaterialResponse> {
    try {
      if (!materialArray.length) return { message: 'Error: Empty list.' };
      const createdMaterials = await Promise.all(
        materialArray.map(async (strMaterial) => {
          // parse the material body
          const material = JSON.parse(strMaterial);
          const { type, title, status, data } = material;

          // if name already exists return error
          const existingTitle = await this.materialModel
            .findOne({ title })
            .exec();
          if (existingTitle) return { message: 'Name already exists.' };

          const createdMaterial = new this.materialModel({
            type,
            title,
            status,
            category,
            formData: data,
          });

          return await createdMaterial.save();
        })
      );

      return { message: createdMaterials.toString() };
    } catch (err) {
      throw err;
    }
  }

  async updateOne(
    materialId: string,
    category: string[],
    title: string,
    type: string,
    formData: string
  ): Promise<UpdateMaterialResponse> {
    try {
      const updatedMaterial = await this.materialModel.updateOne(
        {
          _id: materialId,
        },
        {
          $set: {
            category,
            title,
            type,
            formData,
          },
        }
      );

      return { message: JSON.stringify(updatedMaterial) };
    } catch (err) {
      throw err;
    }
  }
}

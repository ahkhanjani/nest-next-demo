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
  }

  async findOneById(id: string): Promise<Material> {
    return await this.materialModel.findOne({ id }).exec();
  }

  async findByCategoryId(categoryId: string): Promise<Material[]> {
    const found = await this.materialModel
      .find({ category: categoryId })
      .exec();
    return found;
  }

  async findAll(): Promise<Material[]> {
    return await this.materialModel.find().exec();
  }

  /**
   * Search for an existing material with the same title as user input.
   * @param {string} title This will be used to search for a duplicate title.
   * @returns {boolean} `true` if title already exists.
   */
  async checkTitleExists(title: string): Promise<boolean> {
    const existingMaterial = await this.materialModel.findOne({ title }).exec();
    return Boolean(existingMaterial);
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createMany(
    materialArray: string[],
    category: string[]
  ): Promise<CreateMaterialResponse> {
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
  }

  async updateOne(
    materialId: string,
    category: string[],
    title: string,
    type: string,
    formData: string
  ): Promise<UpdateMaterialResponse> {
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
  }
}

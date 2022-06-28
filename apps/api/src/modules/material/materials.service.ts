import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// interface
import { Material, MaterialModel } from './interface/material.interface';
// dto
import { CreateMaterialsInput } from './dto/create-materials-input.dto';
import { CreateMaterialsResponse } from './dto/create-materials-response.dto';
import { FailedMaterialResponse } from './dto/failed-material-response.dto';
import { MaterialsPaginateInput } from './dto/paginate-input.dto';
import { MaterialsPaginateResponse } from './dto/paginate-response.dto';
import { UpdateMaterialInput } from './dto/update-material-input.dto';
import { UpdateMaterialResponse } from './dto/update-material-response.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<MaterialModel>
  ) {}

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async paginate({
    limit,
    page,
    categoryId,
  }: MaterialsPaginateInput): Promise<MaterialsPaginateResponse> {
    const offset: number = (page - 1) * limit;
    const materials: Material[] = await this.materialModel
      .find({ category: categoryId })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);
    const materialsCount: number = await this.materialModel.count({
      categoryId,
    });
    const pagesCount: number = Math.ceil(materialsCount / limit);

    return { materials, pagesCount };
  }

  async findOne(id: string): Promise<Material> {
    return await this.materialModel.findById(id);
  }

  async findByCategoryId(categoryId: string): Promise<Material[]> {
    return await this.materialModel.find({
      category: categoryId,
    });
  }

  async findOneByTitle(title: string): Promise<Material> {
    return await this.materialModel.findOne({
      title,
    });
  }

  async findAll(): Promise<Material[]> {
    return await this.materialModel.find();
  }

  /**
   * Search for an existing material with the same title as user input.
   * @param {string} title This will be used to search for a duplicate title.
   * @returns {boolean} `true` if title already exists.
   */
  async checkTitleExists(title: string): Promise<boolean> {
    const material = await this.materialModel.exists({ title });
    const exists = Boolean(material);
    return exists;
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createMany(
    dto: CreateMaterialsInput
  ): Promise<CreateMaterialsResponse> {
    const { category, materialDtoArray } = dto;

    if (!materialDtoArray.length) return { errors: ['Error: Empty list.'] };

    const failedMaterials: FailedMaterialResponse[] = [];
    const createdMaterials: Material[] = [];

    await Promise.all(
      materialDtoArray.map(async (materialData) => {
        const { title, ...rest } = materialData;

        // if name already exists, return error.
        const titleExists: boolean = await this.checkTitleExists(title);
        if (titleExists) {
          failedMaterials.push({
            message: 'Title already exists.',
            materialTitle: title,
          });
          return;
        }

        const createdMaterial = await this.materialModel.create({
          category,
          title,
          ...rest,
        });
        createdMaterials.push(createdMaterial);
      })
    );

    return {
      failedMaterials,
      createdMaterials,
    };
  }

  async updateOne({
    materialId,
    ...rest
  }: UpdateMaterialInput): Promise<UpdateMaterialResponse> {
    const updatedMaterial = await this.materialModel.updateOne(
      {
        _id: materialId,
      },
      {
        $set: {
          ...rest,
        },
      }
    );

    return { message: JSON.stringify(updatedMaterial) };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatedMaterial,
  Material,
  MaterialModel,
  MaterialDataObject,
} from '@fm/nest/material/interface';
import {
  CreateMaterialsResponse,
  MaterialPaginateInput,
  MaterialPaginateResponse,
  UpdateMaterialResponse,
} from '@fm/nest/material/dto';

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
  }: MaterialPaginateInput): Promise<MaterialPaginateResponse> {
    const offset: number = (page - 1) * limit;
    const materials: Material[] = await this.materialModel
      .find({ category: categoryId })
      .sort([['_id', -1]])
      .skip(offset)
      .limit(limit);
    const materialsCount: number = await this.materialModel.count({
      categoryId,
    });
    const pagesCount: number = Math.ceil(materialsCount / limit);

    return { materials, pagesCount };
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialModel.findById(id);
    return material;
  }

  async findByCategoryId(categoryId: string): Promise<Material[]> {
    const found: Material[] = await this.materialModel.find({
      category: categoryId,
    });
    return found;
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
    category: string[],
    materialDataArray: MaterialDataObject[]
  ): Promise<CreateMaterialsResponse> {
    if (!materialDataArray.length) return { message: 'Error: Empty list.' };

    const createdMaterials: CreatedMaterial[] = await Promise.all(
      materialDataArray.map(async (materialData) => {
        const { title, ...rest } = materialData;

        // if name already exists, return error.
        const titleExists: boolean = await this.checkTitleExists(title);
        if (titleExists)
          return {
            message: 'Name already exists.',
            materialTitle: title,
          };

        const createdMaterial = await this.materialModel.create({
          category,
          title,
          ...rest,
        });
        return { createdMaterial };
      })
    );

    return {
      createdMaterials,
    };
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

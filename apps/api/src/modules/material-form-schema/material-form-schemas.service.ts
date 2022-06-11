import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as YAML from 'yaml';
// interface
import {
  MaterialFormSchema,
  MaterialFormSchemaModel,
} from '@fm/nest/material-form-schema/interface/material-form-schema.interface';
import type { CreateMaterialFormSchemaResponse } from '@fm/nest/material-form-schema/dto/create-material-form-schema-response.dto';
import type { JSONSchema7 } from 'json-schema';

@Injectable()
export class MaterialFormSchemasService {
  constructor(
    @InjectModel(MaterialFormSchema.name)
    private readonly materialFormSchemaModel: Model<MaterialFormSchemaModel>
  ) {}
  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  async findAll(): Promise<MaterialFormSchema[]> {
    return await this.materialFormSchemaModel.find();
  }

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  async createMaterialFormSchema(
    files: Array<Express.Multer.File>
  ): Promise<CreateMaterialFormSchemaResponse> {
    try {
      const createdSchemas: MaterialFormSchema[] = [];
      const errorFileNames: string[] = [];

      await Promise.all(
        files.map(async (file) => {
          try {
            const strYamlSchema: string = file.buffer.toString('utf-8');
            const jsonSchema: JSONSchema7 = YAML.parse(strYamlSchema);
            const strJsonSchema: string = JSON.stringify(jsonSchema);

            const createdMaterialFormSchema: MaterialFormSchema =
              await this.materialFormSchemaModel.create({
                title: jsonSchema.title,
                strSchema: strJsonSchema,
              });

            createdSchemas.push(createdMaterialFormSchema);
          } catch (error) {
            errorFileNames.push(file.filename);
          }
        })
      );

      return {
        createdSchemas: createdSchemas.length ? createdSchemas : undefined,
        errors: errorFileNames.length
          ? [
              {
                field: 'file-input',
                message: `Error occurred with file(s): ${errorFileNames.join(
                  ', '
                )}`,
              },
            ]
          : undefined,
      };
    } catch (error) {
      return {
        errors: [{ field: 'file-input', message: "Coundn't read file(s)." }],
      };
    }
  }
}

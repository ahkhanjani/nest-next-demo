import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateMaterialFormSchemaResponse } from './dto/create-material-form-schema-response.dto';
// module
import { MaterialFormSchemasService } from './material-form-schemas.service';
// interface

@Controller('material-form-schema')
export class MaterialFormSchemasController {
  constructor(
    private readonly materialFormSchemasService: MaterialFormSchemasService
  ) {}

  //
  // ─── POST ───────────────────────────────────────────────────────────────────────
  //

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMaterialFormSchemas(
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<CreateMaterialFormSchemaResponse> {
    return await this.materialFormSchemasService.createMany(files);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from '../materials.service';
import { MaterialsResolver } from '../materials.resolver';
import { materialStub } from './stubs/material.stub';
import { Material } from '../interface/material.interface';
import { MaterialsPaginateResponse } from '../dto/paginate-response.dto';
import { MaterialsPaginateInput } from '../dto/paginate-input.dto';
import { CreateMaterialsInput } from '../dto/create-materials-input.dto';
import { CreateMaterialsResponse } from '../dto/create-materials-response.dto';
import { UpdateMaterialResponse } from '../dto/update-material-response.dto';
import { UpdateMaterialInput } from '../dto/update-material-input.dto';

jest.mock('../materials.service.ts');

describe('MaterialsResolver', () => {
  let resolver: MaterialsResolver;
  let service: MaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialsResolver, MaterialsService],
    }).compile();

    resolver = module.get<MaterialsResolver>(MaterialsResolver);
    service = module.get<MaterialsService>(MaterialsService);
    jest.clearAllMocks();
  });

  describe('materialsResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });

  describe('materialsService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

  describe('getMaterial', () => {
    describe('when getMaterial is called', () => {
      let material: Material;

      beforeEach(async () => {
        material = await resolver.getMaterial(materialStub().id);
      });

      it('should call materialsService', () => {
        expect(service.findOne).toHaveBeenCalledWith(materialStub().id);
        expect(service.findOne).toHaveBeenCalledTimes(1);
      });

      it('should return a material', () => {
        expect(material).toEqual<Material>(materialStub());
      });
    });
  });

  describe('getMaterials', () => {
    describe('when getMaterials is called', () => {
      let materials: Material[];

      beforeEach(async () => {
        materials = await resolver.getMaterials();
      });

      it('should call materialsService', () => {
        expect(service.findAll).toHaveBeenCalled();
        expect(service.findAll).toHaveBeenCalledTimes(1);
      });

      it('should return materials', () => {
        expect(materials).toEqual<Material[]>([materialStub()]);
      });
    });
  });

  describe('getMaterialsByCategoryId', () => {
    describe('when getMaterialsByCategoryId is called', () => {
      let materials: Material[];

      beforeEach(async () => {
        materials = await resolver.getMaterialsByCategoryId(
          materialStub().category[0]
        );
      });

      it('should call materialsService', () => {
        expect(service.findByCategoryId).toHaveBeenCalledWith(
          materialStub().category[0]
        );
        expect(service.findByCategoryId).toHaveBeenCalledTimes(1);
      });

      it('should return materials', () => {
        expect(materials).toEqual<Material[]>([materialStub()]);
      });
    });
  });

  describe('checkMaterialTitleExists', () => {
    describe('when checkMaterialTitleExists is called', () => {
      describe('if title exists', () => {
        let exists: boolean;

        beforeEach(async () => {
          exists = await resolver.checkMaterialTitleExists(
            materialStub().title
          );
        });

        it('should call materialsService', () => {
          expect(service.checkTitleExists).toHaveBeenCalledWith(
            materialStub().title
          );
          expect(service.checkTitleExists).toHaveBeenCalledTimes(1);
        });

        it('should return true', () => {
          expect(exists).toEqual<boolean>(true);
        });
      });

      describe('if title does not exist', () => {
        let exists: boolean;
        const notTitle = `not-${materialStub().title}`;

        beforeEach(async () => {
          exists = await resolver.checkMaterialTitleExists(notTitle);
        });

        it('should call materialsService', () => {
          expect(service.checkTitleExists).toHaveBeenCalledWith(notTitle);
          expect(service.checkTitleExists).toHaveBeenCalledTimes(1);
        });

        it('should return false', () => {
          expect(exists).toEqual<boolean>(false);
        });
      });
    });
  });

  describe('materialsPaginate', () => {
    describe('when materialsPaginate is called', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...restData } = materialStub();

      describe('should get the first page', () => {
        let response: MaterialsPaginateResponse;
        const materialsPaginateDto: MaterialsPaginateInput = {
          categoryId: materialStub().category[0],
          limit: 2,
          page: 1,
        };

        beforeEach(async () => {
          response = await resolver.materialsPaginate(materialsPaginateDto);
          console.log(response);
        });

        it('should call materialsService', () => {
          expect(service.paginate).toHaveBeenCalledWith(materialsPaginateDto);
          expect(service.paginate).toHaveBeenCalledTimes(1);
        });

        it('should return materials', () => {
          expect(response).toEqual<MaterialsPaginateResponse>({
            materials: [
              {
                id: 'someId3',
                ...restData,
              },
              {
                id: 'someId2',
                ...restData,
              },
            ],
            pagesCount: 2,
          });
        });
      });

      describe('should get the second page', () => {
        let response: MaterialsPaginateResponse;
        const materialsPaginateDto: MaterialsPaginateInput = {
          categoryId: materialStub().category[0],
          limit: 2,
          page: 2,
        };

        beforeEach(async () => {
          response = await resolver.materialsPaginate(materialsPaginateDto);
        });

        it('should call materialsService', () => {
          expect(service.paginate).toHaveBeenCalledWith(materialsPaginateDto);
          expect(service.paginate).toHaveBeenCalledTimes(1);
        });

        it('should return materials', () => {
          expect(response).toEqual<MaterialsPaginateResponse>({
            materials: [
              {
                id: 'someId1',
                ...restData,
              },
            ],
            pagesCount: 2,
          });
        });
      });
    });
  });

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  describe('createMaterials', () => {
    describe('when createMaterials is called', () => {
      let response: CreateMaterialsResponse;
      let createMaterialsDto: CreateMaterialsInput;

      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, createdAt: __, category, ...rest } = materialStub();
        createMaterialsDto = {
          category,
          materialDtoArray: [rest, rest],
        };
        response = await resolver.createMaterials(createMaterialsDto);
      });

      it('should call materialsService', () => {
        expect(service.createMany).toHaveBeenCalledWith(createMaterialsDto);
        expect(service.createMany).toHaveBeenCalledTimes(1);
      });

      it('should return response', () => {
        expect(response).toEqual<CreateMaterialsResponse>({
          createdMaterials: [materialStub(), materialStub()],
        });
      });
    });
  });

  describe('updateMaterial', () => {
    describe('when updateMaterial is called', () => {
      let response: UpdateMaterialResponse;
      let updateMaterialDto: UpdateMaterialInput;

      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt: _, id, ...rest } = materialStub();
        updateMaterialDto = { materialId: id, ...rest };
        response = await resolver.updateMaterial(updateMaterialDto);
      });

      it('should call materialsService', () => {
        expect(service.updateOne).toHaveBeenCalledWith(updateMaterialDto);
      });

      it('should return response', () => {
        expect(response).toEqual<UpdateMaterialResponse>({
          message: JSON.stringify(materialStub()),
        });
      });
    });
  });
});

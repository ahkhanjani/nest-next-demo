import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from '../materials.service';
import { MaterialsResolver } from '../materials.resolver';
import { Material } from '@fm/nest/material/interface';
import { materialStub } from './stubs';
import {
  CreateMaterialsInput,
  CreateMaterialsResponse,
  MaterialsPaginateInput,
  MaterialsPaginateResponse,
} from '@fm/nest/material/dto';

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

      it('then it should call materialsService', () => {
        expect(service.findOne).toHaveBeenCalledWith(materialStub().id);
      });

      it('then it should return a material', () => {
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

      it('then it should call materialsService', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      it('then it should return materials', () => {
        expect(materials).toEqual<Material[]>([materialStub()]);
      });
    });
  });

  describe('getMaterialByCategoryId', () => {
    describe('when getMaterialByCategoryId is called', () => {
      let materials: Material[];

      beforeEach(async () => {
        materials = await resolver.getMaterialsByCategoryId(
          materialStub().category[0]
        );
      });

      it('then it should call materialsService', () => {
        expect(service.findByCategoryId).toHaveBeenCalledWith(
          materialStub().category[0]
        );
      });

      it('then it should return materials', () => {
        expect(materials).toEqual<Material[]>([materialStub()]);
      });
    });
  });

  describe('checkMaterialTitleExists', () => {
    describe('when checkMaterialTitleExists is called', () => {
      describe('when title exists', () => {
        let exists: boolean;

        beforeEach(async () => {
          exists = await resolver.checkMaterialTitleExists(
            materialStub().title
          );
        });

        it('then it should call materialsService', () => {
          expect(service.checkTitleExists).toHaveBeenCalledWith(
            materialStub().title
          );
        });

        it('then it should return true', () => {
          expect(exists).toEqual<boolean>(true);
        });
      });

      describe('when title does not exist', () => {
        let exists: boolean;
        const notTitle = `not-${materialStub().title}`;

        beforeEach(async () => {
          exists = await resolver.checkMaterialTitleExists(notTitle);
        });

        it('then it should call materialsService', () => {
          expect(service.checkTitleExists).toHaveBeenCalledWith(notTitle);
        });

        it('then it should return false', () => {
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
      let materialsResponse: CreateMaterialsResponse;
      let createMaterialsDto: CreateMaterialsInput;

      beforeEach(async () => {
        const { category, formData, status, title, type } = materialStub();

        createMaterialsDto = {
          category,
          materialDataArray: [{ formData, status, title, type }],
        };

        materialsResponse = await resolver.createMaterials(createMaterialsDto);
        console.log(JSON.stringify(materialsResponse));
      });

      it('then it should call materialsService', () => {
        const { category, materialDataArray } = createMaterialsDto;
        expect(service.createMany).toHaveBeenCalledWith(
          category,
          materialDataArray
        );
      });

      it('then it should return response', () => {
        expect(materialsResponse).toEqual<CreateMaterialsResponse>({
          createdMaterials: [
            {
              createdMaterial: materialStub(),
            },
          ],
        });
      });
    });
  });
});

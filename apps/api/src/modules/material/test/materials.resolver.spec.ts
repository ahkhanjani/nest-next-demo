import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from '../materials.service';
import { MaterialsResolver } from '../materials.resolver';
import { Material } from '@fm/nest/material/interface';
import { materialStub } from './stubs';
import {
  CreateMaterialsInput,
  CreateMaterialsResponse,
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

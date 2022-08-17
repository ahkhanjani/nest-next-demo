import { Test, TestingModule } from '@nestjs/testing';

import { MaterialCategoriesService } from '../material-categories.service';
import { MaterialCategoriesResolver } from '../material-categories.resolver';

import { materialCategoryStub } from './stubs/material-category.stub';
import type { MaterialCategory } from '../interface/material-category.interface';
import type { MaterialCategoriesPaginateResponse } from '../dto/material-categories-paginate-response.dto';
import type { MaterialCategoriesPaginateInput } from '../dto/material-categories-paginate-input.dto';
import type { CreateMaterialCategoryInput } from '../dto/create-material-category-input.dto';
import type { CreateMaterialCategoryResponse } from '../dto/create-material-category-response.dto';
import type { UpdateMaterialCategoryInput } from '../dto/update-material-category-input.dto';
import type { UpdateMaterialCategoryResponse } from '../dto/update-material-category-response.dto';

jest.mock('../material-categories.service.ts');

describe('MaterialCategoriesResolver', () => {
  let resolver: MaterialCategoriesResolver;
  let service: MaterialCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialCategoriesResolver, MaterialCategoriesService],
    }).compile();

    resolver = module.get<MaterialCategoriesResolver>(
      MaterialCategoriesResolver,
    );
    service = module.get<MaterialCategoriesService>(MaterialCategoriesService);
    jest.clearAllMocks();
  });

  describe('materialCategoriesResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });

  describe('materialCategoriesService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  // ─── Query ──────────────────────────────────────────────────────────────────────

  describe('getMaterialCategory', () => {
    describe('when getMaterialCategory is called', () => {
      let materialCategory: MaterialCategory;

      beforeEach(async () => {
        materialCategory = await resolver.getMaterialCategory(
          materialCategoryStub().id,
        );
      });

      it('should call materialCategoriesService', () => {
        expect(service.findOne).toHaveBeenCalledWith(materialCategoryStub().id);
        expect(service.findOne).toHaveBeenCalledTimes(1);
      });

      it('should return a material category', () => {
        expect(materialCategory).toEqual<MaterialCategory>(
          materialCategoryStub(),
        );
      });
    });
  });

  describe('getMaterialCategories', () => {
    describe('when getMaterialCategories is called', () => {
      let materialCategories: MaterialCategory[];

      beforeEach(async () => {
        materialCategories = await resolver.getMaterialCategories();
      });

      it('should call materialCategoriesService', () => {
        expect(service.findAll).toHaveBeenCalled();
        expect(service.findAll).toHaveBeenCalledTimes(1);
      });

      it('should return material categories', () => {
        expect(materialCategories).toEqual<MaterialCategory[]>([
          materialCategoryStub(),
        ]);
      });
    });
  });

  describe('getMaterialCategoriesByParentId', () => {
    describe('when getMaterialCategoriesByParentId is called', () => {
      let materialCategories: MaterialCategory[];

      beforeEach(async () => {
        materialCategories = await resolver.getMaterialCategoriesByParentId(
          materialCategoryStub().parentId,
        );
      });

      it('should call materialCategoriesService', () => {
        expect(service.findByParentId).toHaveBeenCalledWith(
          materialCategoryStub().parentId,
        );
        expect(service.findByParentId).toHaveBeenCalledTimes(1);
      });

      it('should return material categories', () => {
        expect(materialCategories).toEqual<MaterialCategory[]>([
          materialCategoryStub(),
        ]);
      });
    });
  });

  describe('getMaterialCategoriesPaginate', () => {
    describe('when materialCategoriesPaginate is called', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...restData } = materialCategoryStub();

      describe('should get the first page', () => {
        let response: MaterialCategoriesPaginateResponse;
        const materialCategoriesPaginateDto: MaterialCategoriesPaginateInput = {
          parentId: materialCategoryStub().parentId,
          limit: 2,
          page: 1,
        };

        beforeEach(async () => {
          response = await resolver.getMaterialCategoriesPaginate(
            materialCategoriesPaginateDto,
          );
          console.log(response);
        });

        it('should call materialCategoriesService', () => {
          expect(service.paginate).toHaveBeenCalledWith(
            materialCategoriesPaginateDto,
          );
          expect(service.paginate).toHaveBeenCalledTimes(1);
        });

        it('should return material categories', () => {
          expect(response).toEqual<MaterialCategoriesPaginateResponse>({
            materialCategories: [
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
        let response: MaterialCategoriesPaginateResponse;
        const materialCategoriesPaginateDto: MaterialCategoriesPaginateInput = {
          parentId: materialCategoryStub().parentId,
          limit: 2,
          page: 2,
        };

        beforeEach(async () => {
          response = await resolver.getMaterialCategoriesPaginate(
            materialCategoriesPaginateDto,
          );
        });

        it('should call materialCategoriesService', () => {
          expect(service.paginate).toHaveBeenCalledWith(
            materialCategoriesPaginateDto,
          );
          expect(service.paginate).toHaveBeenCalledTimes(1);
        });

        it('should return material categories', () => {
          expect(response).toEqual<MaterialCategoriesPaginateResponse>({
            materialCategories: [
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

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  describe('createMaterialCategory', () => {
    describe('when createMaterialCategory is called', () => {
      let response: CreateMaterialCategoryResponse;
      let createMaterialCategoryDto: CreateMaterialCategoryInput;

      beforeEach(async () => {
        const { title, parentId } = materialCategoryStub();
        createMaterialCategoryDto = {
          title,
          parentId,
        };
        response = await resolver.createMaterialCategory(
          createMaterialCategoryDto,
        );
      });

      it('should call materialCategoriesService', () => {
        expect(service.createOne).toHaveBeenCalledWith(
          createMaterialCategoryDto,
        );
        expect(service.createOne).toHaveBeenCalledTimes(1);
      });

      it('should return response with material category', () => {
        expect(response).toEqual<CreateMaterialCategoryResponse>({
          materialCategory: materialCategoryStub(),
        });
      });
    });
  });

  describe('updateMaterialCategory', () => {
    describe('when updateMaterialCategory is called', () => {
      let response: UpdateMaterialCategoryResponse;
      let updateMaterialCategoryDto: UpdateMaterialCategoryInput;

      beforeEach(async () => {
        const { id, title } = materialCategoryStub();
        updateMaterialCategoryDto = { id, title };
        response = await resolver.updateMaterialCategory(
          updateMaterialCategoryDto,
        );
      });

      it('should call materialCategoriessService', () => {
        expect(service.updateOne).toHaveBeenCalledWith(
          updateMaterialCategoryDto,
        );
        expect(service.updateOne).toHaveBeenCalledTimes(1);
      });

      it('should return response with success', () => {
        expect(response).toEqual<UpdateMaterialCategoryResponse>({
          success: true,
        });
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MaterialCategoriesService } from '../material-categories.service';
import { MaterialCategoriesResolver } from '../material-categories.resolver';
import { materialCategoryStub } from './stubs/material-category.stub';
import {
  UpdateCategoryInput,
  UpdateMaterialCategoryResponse,
} from '@fm/nest/material-categoy/dto';

jest.mock('../material-categories.service.ts');

describe('MaterialCategoriesResolver', () => {
  let resolver: MaterialCategoriesResolver;
  let service: MaterialCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialCategoriesResolver, MaterialCategoriesService],
    }).compile();

    resolver = module.get<MaterialCategoriesResolver>(
      MaterialCategoriesResolver
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

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //

  describe('updateMaterialCategory', () => {
    describe('when updateMaterialCategory is called', () => {
      let response: UpdateMaterialCategoryResponse;
      let updateMaterialCategoryDto: UpdateCategoryInput;

      beforeEach(async () => {
        const { id, title } = materialCategoryStub();
        updateMaterialCategoryDto = { id, title };
        response = await resolver.updateCategory(updateMaterialCategoryDto);
      });

      it('should call materialCategoriessService', () => {
        expect(service.updateOne).toHaveBeenCalledWith(
          updateMaterialCategoryDto
        );
        expect(service.updateOne).toHaveBeenCalledTimes(1);
      });

      it('should return response', () => {
        expect(response).toEqual<UpdateMaterialCategoryResponse>({
          success: true,
        });
      });
    });
  });
});

import { MockType } from 'fm/types';
import { CreateMaterialCategoryInput } from '../dto/create-material-category-input.dto';
import { CreateMaterialCategoryResponse } from '../dto/create-material-category-response.dto';
import { MaterialCategoriesPaginateResponse } from '../dto/material-categories-paginate-response.dto';
import { UpdateMaterialCategoryResponse } from '../dto/update-material-category-response.dto';
import { MaterialCategory } from '../interface/material-category.interface';
import { MaterialCategoriesService as ServiceType } from '../material-categories.service';
import { materialCategoryStub } from '../test/stubs/material-category.stub';

export const MaterialCategoriesService = jest.fn(
  (): MockType<ServiceType> => ({
    updateOne: jest.fn(
      (): UpdateMaterialCategoryResponse => ({ success: true })
    ),
    createOne: jest.fn(
      (): CreateMaterialCategoryResponse => ({
        materialCategory: materialCategoryStub(),
      })
    ),
    findOne: jest.fn((): MaterialCategory => materialCategoryStub()),
    findAll: jest.fn((): MaterialCategory[] => [materialCategoryStub()]),
    findByParentId: jest.fn((): [MaterialCategory] => [materialCategoryStub()]),
    checkAlreadyExists: jest.fn(
      ({ title, parentId }: CreateMaterialCategoryInput): boolean =>
        title === materialCategoryStub().title &&
        parentId === materialCategoryStub().parentId
    ),
    paginate: jest.fn(
      ({ page }: { page: number }): MaterialCategoriesPaginateResponse => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...restData } = materialCategoryStub();
        const categories: MaterialCategory[] =
          page === 1
            ? [
                { ...restData, id: 'someId3' },
                { ...restData, id: 'someId2' },
              ]
            : [{ ...restData, id: 'someId1' }];
        return { materialCategories: categories, pagesCount: 2 };
      }
    ),
  })
);

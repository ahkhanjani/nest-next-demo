import {
  CreateMaterialsResponse,
  MaterialsPaginateResponse,
  UpdateMaterialResponse,
} from '@fm/nest/material/dto';
import { Material } from '@fm/nest/material/interface';
import { MockType } from '@fm/types';
import { MaterialsService as ServiceType } from '../materials.service';
import { materialStub } from '../test/stubs/material.stub';

export const MaterialsService = jest.fn(
  (): MockType<ServiceType> => ({
    findOne: jest.fn((): Material => materialStub()),
    findAll: jest.fn((): Material[] => [materialStub()]),
    createMany: jest.fn(
      (): CreateMaterialsResponse => ({
        createdMaterials: [
          { createdMaterial: materialStub() },
          { createdMaterial: materialStub() },
        ],
      })
    ),
    updateOne: jest.fn(
      (): UpdateMaterialResponse => ({
        message: JSON.stringify(materialStub()),
      })
    ),

    findByCategoryId: jest.fn((): Material[] => [materialStub()]),
    checkTitleExists: jest.fn(
      (title: string): boolean => title === materialStub().title
    ),
    paginate: jest.fn(
      ({ page }: { page: number }): MaterialsPaginateResponse => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...restData } = materialStub();
        const materials: Material[] =
          page === 1
            ? [
                { ...restData, id: 'someId3' },
                { ...restData, id: 'someId2' },
              ]
            : [{ ...restData, id: 'someId1' }];
        return { materials, pagesCount: 2 };
      }
    ),
  })
);

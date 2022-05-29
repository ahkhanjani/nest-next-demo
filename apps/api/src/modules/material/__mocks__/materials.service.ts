import { MaterialsPaginateResponse } from '@fm/nest/material/dto';
import { Material } from '@fm/nest/material/interface';
import { MockType } from '@fm/types';
import { MaterialsService as ServiceType } from '../materials.service';
import { materialStub } from '../test/stubs/material.stub';

export const MaterialsService = jest.fn(
  (): MockType<ServiceType> => ({
    findOne: jest.fn().mockReturnValue(materialStub()),
    findAll: jest.fn().mockReturnValue([materialStub()]),
    createMany: jest.fn().mockReturnValue({
      createdMaterials: [{ createdMaterial: materialStub() }],
    }),
    findByCategoryId: jest.fn().mockReturnValue([materialStub()]),
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

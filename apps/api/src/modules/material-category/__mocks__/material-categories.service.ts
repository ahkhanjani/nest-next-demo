import { UpdateMaterialCategoryResponse } from '@fm/nest/material-categoy/dto';
import { MockType } from '@fm/types';
import { MaterialCategoriesService as ServiceType } from '../material-categories.service';

export const MaterialCategoriesService = jest.fn(
  (): MockType<ServiceType> => ({
    updateOne: jest.fn(
      (): UpdateMaterialCategoryResponse => ({ success: true })
    ),
  })
);

import 'ts-jest';
import { MockType } from '@fm/types';
import { MaterialsService as ServiceType } from '../materials.service';
import { materialStub } from '../test/stubs/material.stub';

export const MaterialsService = jest.fn(
  (): MockType<ServiceType> => ({
    findOne: jest.fn().mockReturnValue(materialStub()),
    findAll: jest.fn().mockReturnValue([materialStub()]),
  })
);

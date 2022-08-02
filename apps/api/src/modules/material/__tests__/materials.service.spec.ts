// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { MaterialsService } from '../materials.service';
// import { Material, MaterialModel } from 'fm/nest/material/interface';
// import { MockType } from 'fm/types';
// import { Model } from 'mongoose';
// import { materialStub } from './stubs';
//
// export const mockMaterialSchema: MockType<Model<MaterialModel>> = {
//   findById: jest.fn((): Material => materialStub()),
//   find: jest.fn((): Material[] => [materialStub()]),
//   create: jest.fn((): Material => materialStub()),
// };
//
// describe('MaterialsService', () => {
//   let service: MaterialsService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         MaterialsService,
//         {
//           provide: getModelToken(Material.name),
//           useValue: mockMaterialSchema,
//         },
//       ],
//     }).compile();
//
//     service = module.get<MaterialsService>(MaterialsService);
//     jest.clearAllMocks();
//   });
//
//   describe('materialsService', () => {
//     it('should be defined', () => {
//       expect(service).toBeDefined();
//     });
//   });
// });

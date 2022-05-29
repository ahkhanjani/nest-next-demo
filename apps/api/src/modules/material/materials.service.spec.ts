import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types as mongooseTypes } from 'mongoose';
const { ObjectId } = mongooseTypes;
import { MaterialsService } from './materials.service';
import { MaterialModel, Material } from '@fm/nest/material/interface';
import { MaterialDataObject } from '@fm/nest/material/interface/material-data-object.interface';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
describe('MaterialsService', () => {
  let service: MaterialsService;
  const materialModelMock: MockType<Model<MaterialModel>> = {
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    exists: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialsService,
        {
          provide: getModelToken(Material.name),
          useValue: materialModelMock,
        },
      ],
    }).compile();
    service = module.get<MaterialsService>(MaterialsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMany', () => {
    const category: string[] = [
      new ObjectId().toString(),
      new ObjectId().toString(),
    ];

    it('should create many materials', async () => {
      const materialDataArray: MaterialDataObject[] = [
        {
          formData: '{"q":{"title":"Qwe","description":"rty"}}',
          title: 'Material of the Year',
          type: 'Information Card',
          status: 'published',
        },
        {
          formData: '{"q":{"title":"Aze","description":"rty"}}',
          title: 'Hello World!',
          type: 'Simple Text',
          status: 'unpublished',
        },
      ];

      materialModelMock.create
        .mockReturnValueOnce({
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category,
          ...materialDataArray[0],
        })
        .mockReturnValueOnce({
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category,
          ...materialDataArray[1],
        });

      const res = await service.createMany(category, materialDataArray);

      expect(materialModelMock.create).toHaveBeenCalledTimes(2);

      expect(res.createdMaterials).toContainEqual({
        createdMaterial: {
          id: expect.any(String),
          createdAt: expect.any(Date),
          category,
          ...materialDataArray[0],
        },
      });

      expect(res.createdMaterials).toContainEqual({
        createdMaterial: {
          id: expect.any(String),
          createdAt: expect.any(Date),
          category,
          ...materialDataArray[1],
        },
      });

      expect(materialModelMock.create).toHaveBeenCalledWith<
        [{ category: string[] } & MaterialDataObject]
      >({ category, ...materialDataArray[0] });

      expect(materialModelMock.create).toHaveBeenCalledWith<
        [{ category: string[] } & MaterialDataObject]
      >({ category, ...materialDataArray[1] });
    });

    it('should return duplicate title error', async () => {
      // both have the same title
      const materialDataArray: MaterialDataObject[] = [
        {
          formData: '{"q":{"title":"Qwe","description":"rty"}}',
          title: 'Same Title',
          type: 'Information Card',
          status: 'published',
        },
        {
          formData: '{"q":{"title":"Aze","description":"rty"}}',
          title: 'Same Title',
          type: 'Simple Text',
          status: 'unpublished',
        },
      ];

      materialModelMock.create.mockReturnValue({
        id: new ObjectId().toString(),
        createdAt: new Date(),
        category,
        ...materialDataArray[0],
      });

      const res = await service.createMany(category, materialDataArray);

      expect(materialModelMock.create).toHaveBeenCalledTimes(1);

      expect(res.createdMaterials).toContainEqual({
        createdMaterial: {
          id: expect.any(String),
          createdAt: expect.any(Date),
          category,
          ...materialDataArray[0],
        },
      });

      expect(res.createdMaterials).toContainEqual({
        message: 'Name already exists.',
        materialTitle: materialDataArray[1].title,
      });

      expect(materialModelMock.create).toHaveBeenCalledWith<
        [{ category: string[] } & MaterialDataObject]
      >({ category, ...materialDataArray[0] });

      expect(materialModelMock.create).toHaveBeenCalledWith<
        [{ category: string[] } & MaterialDataObject]
      >({ category, ...materialDataArray[1] });
    });
  });

  describe('findAll', () => {
    it('should find all materials', async () => {
      const materials: Material[] = [
        {
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category: [new ObjectId().toString(), new ObjectId().toString()],
          formData: '{"q":{"title":"Qwe","description":"rty"}}',
          title: 'Material of the Year',
          type: 'Information Card',
          status: 'published',
        },
        {
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category: [new ObjectId().toString(), new ObjectId().toString()],
          formData: '{"q":{"title":"Aze","description":"rty"}}',
          title: 'Hello World!',
          type: 'Simple Text',
          status: 'unpublished',
        },
      ];

      materialModelMock.find.mockReturnValue(materials);
      const foundMaterials = await service.findAll();
      expect(foundMaterials).toContainEqual<Material>(materials[0]);
      expect(materialModelMock.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find one material', async () => {
      const material: Material = {
        id: new ObjectId().toString(),
        createdAt: new Date(),
        category: [new ObjectId().toString(), new ObjectId().toString()],
        formData: '{"q":{"title":"Qwe","description":"rty"}}',
        title: 'Material of the Year',
        type: 'Information Card',
        status: 'published',
      };

      materialModelMock.findById.mockReturnValue(material);
      const foundMaterial: Material = await service.findById(material.id);
      expect(foundMaterial).toMatchObject<Material>(material);
      expect(materialModelMock.findById).toHaveBeenCalledWith<[string]>(
        material.id
      );
    });
  });

  describe('findByCategoryId', () => {
    it('should find all materials with the category id', async () => {
      const sharedCategoryId: string = new ObjectId().toString();
      const materials: Material[] = [
        {
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category: [sharedCategoryId, new ObjectId().toString()],
          formData: '{"q":{"title":"Qwe","description":"rty"}}',
          title: 'Material of the Year',
          type: 'Information Card',
          status: 'published',
        },
        {
          id: new ObjectId().toString(),
          createdAt: new Date(),
          category: [sharedCategoryId, new ObjectId().toString()],
          formData: '{"q":{"title":"Aze","description":"rty"}}',
          title: 'Hello World!',
          type: 'Simple Text',
          status: 'unpublished',
        },
      ];

      materialModelMock.find.mockReturnValue(materials);
      const foundMaterials: Material[] = await service.findByCategoryId(
        sharedCategoryId
      );

      expect(materialModelMock.find).toHaveBeenCalledTimes(1);

      expect(foundMaterials).toEqual<Material[]>(materials);

      expect(materialModelMock.find).toHaveBeenCalledWith<
        [{ category: string }]
      >({
        category: sharedCategoryId,
      });
    });
  });
});

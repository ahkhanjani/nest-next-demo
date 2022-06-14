import { User } from '@fm/nest/user/interface';
import { MockType } from '@fm/types';
import { UsersService as ServiceType } from '../users.service';
import { userStub } from '../test/stubs/user.stub';
import { UserResponse } from '@fm/nest/user/dto';

export const UsersService = jest.fn(
  (): MockType<ServiceType> => ({
    count: jest.fn((): number => 2),
    findOne: jest.fn(
      (id: string): User => (id === userStub().id ? userStub() : undefined)
    ),
    findAll: jest.fn((): User[] => [userStub()]),
    createOne: jest.fn((): UserResponse => ({ user: userStub() })),
  })
);

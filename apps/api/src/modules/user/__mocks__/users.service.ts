import { userStub } from '../../../../test/stubs/user.stub';
import type { UsersService as ServiceType } from '../users.service';
import type { User } from '../interface/user.interface';
import type { MockType } from 'fm/shared-types';
import type { CreateUserResponse } from '../dto/create-user-response.dto';

export const UsersService = jest.fn(
  (): MockType<ServiceType> => ({
    count: jest.fn((): number => 2),
    findAll: jest.fn((): User[] => [userStub()]),
    findOne: jest.fn(
      (id: string): User => (id === userStub().id ? userStub() : undefined),
    ),
    findOneByUsername: jest.fn(
      (username: string): User =>
        username === userStub().username ? userStub() : undefined,
    ),
    findOneByUsername_UNSAFE: jest.fn(
      (username: string): User =>
        username === userStub().username ? userStub() : undefined,
    ),
    createOne: jest.fn(
      (): CreateUserResponse => ({ success: true, errors: undefined }),
    ),
  }),
);

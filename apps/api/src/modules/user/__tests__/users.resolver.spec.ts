import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users.service';
import { UsersResolver } from '../users.resolver';

import { userStub } from './stubs/user.stub';
import type { User } from '../interface/user.interface';
import type { CreateUserInput, CreateUserResponse } from '../dto';

jest.mock('../users.service.ts');

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('usersResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });

  describe('usersService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  // ─── Query ──────────────────────────────────────────────────────────────────────

  describe('getUser', () => {
    describe('when getUser is called', () => {
      describe('if user exists', () => {
        let user: User;

        beforeEach(async () => {
          user = await resolver.getUser(userStub().id);
        });

        it('should call usersService', () => {
          expect(service.findOne).toHaveBeenCalledWith(userStub().id);
          expect(service.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return the user', () => {
          expect(user).toEqual<User>(userStub());
        });
      });

      describe('if user does not exist', () => {
        let user: User;

        beforeEach(async () => {
          user = await resolver.getUser('someId');
        });

        it('should call usersService', () => {
          expect(service.findOne).toHaveBeenCalledWith('someId');
          expect(service.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return undefined', () => {
          expect(user).toBeUndefined();
        });
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await resolver.getUsers();
      });

      it('should call usersService', () => {
        expect(service.findAll).toHaveBeenCalled();
        expect(service.findAll).toHaveBeenCalledTimes(1);
      });

      it('should return users', () => {
        expect(users).toEqual<User[]>([userStub()]);
      });
    });
  });

  describe('getUserCount', () => {
    describe('when getUserCount is called', () => {
      let userCount: number;

      beforeEach(async () => {
        userCount = await resolver.getUserCount();
      });

      it('should call usersService', () => {
        expect(service.count).toHaveBeenCalled();
        expect(service.count).toHaveBeenCalledTimes(1);
      });

      it('should return user count', () => {
        expect(userCount).toEqual<number>(2);
      });
    });
  });

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let response: CreateUserResponse;
      let createUserDto: CreateUserInput;

      beforeEach(async () => {
        const { username, password } = userStub();
        createUserDto = { username, password };

        response = await resolver.createUser(createUserDto);
      });

      it('should call usersService', () => {
        expect(service.createOne).toHaveBeenCalledWith(createUserDto);
        expect(service.createOne).toHaveBeenCalledTimes(1);
      });

      it('should return response', () => {
        expect(response).toEqual<CreateUserResponse>({
          success: true,
        });
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersResolver } from '../users.resolver';
import { userStub } from './stubs/user.stub';
import { User } from '@fm/nest/user/interface';

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

  //
  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  //

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

  //
  // ─── MUTATION ───────────────────────────────────────────────────────────────────
  //
});

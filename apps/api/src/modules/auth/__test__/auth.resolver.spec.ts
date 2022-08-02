import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../Auth.service';
import { AuthResolver } from '../Auth.resolver';
import { LoginResponse } from '../dto/login-response.dto';
import { LoginInput } from '../dto/login-input.dto';
import { userStub } from '../../user/__tests__/stubs/user.stub';

jest.mock('../Auth.service.ts');

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('AuthResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  describe('login', () => {
    describe('when login is called', () => {
      let response: LoginResponse;
      let loginDto: LoginInput;

      beforeEach(async () => {
        const { username, password } = userStub();
        loginDto = { username, password };
        response = await resolver.login(undefined, undefined, loginDto);
      });

      it('should call AuthService', () => {
        expect(service.validateUser).toHaveBeenCalledWith(loginDto);
        expect(service.validateUser).toHaveBeenCalledTimes(1);
      });

      it('should return response', () => {
        expect(response).toEqual<LoginResponse>({
          accessToken: userStub().id,
        });
      });
    });
  });
});

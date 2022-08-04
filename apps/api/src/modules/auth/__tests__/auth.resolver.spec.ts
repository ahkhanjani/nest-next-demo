import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthResolver } from '../auth.resolver';
import { LoginResponse } from '../dto/login-response.dto';
import { LoginInput } from '../dto/login-input.dto';
import { userStub } from '../../../../test/stubs/user.stub';

jest.mock('../auth.service.ts');

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    }).compile();

    authResolver = moduleRef.get<AuthResolver>(AuthResolver);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('AuthResolver', () => {
    it('should be defined', () => {
      expect(authResolver).toBeDefined();
    });
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  describe('login', () => {
    let response: LoginResponse;
    let loginDto: LoginInput;

    beforeEach(async () => {
      const { username, password } = userStub();
      loginDto = { username, password };
      response = await authResolver.login({ req: { session: {} } }, loginDto);
    });

    it('should call validateUser in service', () => {
      expect(authService.validateUser).toHaveBeenCalled();
      expect(authService.validateUser).toHaveBeenCalledWith<[string, string]>(
        loginDto.username,
        loginDto.password
      );
    });

    it('should return response', () => {
      expect(response).toEqual<LoginResponse>({
        accessToken: userStub().id,
      });
    });
  });
});

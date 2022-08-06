import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthResolver } from '../auth.resolver';
import { userStub } from '../../../../test/stubs/user.stub';
import { ValidateResponse } from '../dto/validate-response.dto';

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
    const { id: userId, username, password } = userStub();

    describe('with correct credentials', () => {
      let validationResponse: ValidateResponse;

      beforeEach(async () => {
        validationResponse = await authService.validateUser(username, password);
      });

      it('should call validateUser', async () => {
        expect(authService.validateUser).toHaveBeenCalled();
        expect(authService.validateUser).toHaveBeenCalledWith<[string, string]>(
          username,
          password
        );
      });

      it('should return success', () => {
        expect(validationResponse).toEqual<ValidateResponse>({
          userId,
        });
      });
    });

    describe('with wrong username', () => {
      let validationResponse: ValidateResponse;

      const wrongUsernameMock = 'wrong_username';

      beforeEach(async () => {
        validationResponse = await authService.validateUser(
          wrongUsernameMock,
          password
        );
      });

      it('should call validateUser', async () => {
        expect(authService.validateUser).toHaveBeenCalled();
        expect(authService.validateUser).toHaveBeenCalledWith<[string, string]>(
          wrongUsernameMock,
          password
        );
      });

      it('should return error', () => {
        expect(validationResponse).toEqual<ValidateResponse>({
          errors: [
            { field: 'username', message: expect.stringMatching(/username/i) },
          ],
        });
      });
    });

    describe('with wrong password', () => {
      let validationResponse: ValidateResponse;

      const wrongPasswordMock = 'wr0ngPa$$w0rd';

      beforeEach(async () => {
        validationResponse = await authService.validateUser(
          username,
          wrongPasswordMock
        );
      });

      it('should call validateUser', async () => {
        expect(authService.validateUser).toHaveBeenCalled();
        expect(authService.validateUser).toHaveBeenCalledWith<[string, string]>(
          username,
          wrongPasswordMock
        );
      });

      it('should return error', () => {
        expect(validationResponse).toEqual<ValidateResponse>({
          errors: [
            { field: 'password', message: expect.stringMatching(/password/i) },
          ],
        });
      });
    });
  });
});

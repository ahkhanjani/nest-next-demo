// import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../user/users.module';
import { AuthService } from '../Auth.service';
// import { LocalStrategy } from '../strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { userStub } from '../../user/__tests__/stubs/user.stub';
import { ValidateResponse } from '../dto/validate-response.dto';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../user/interface/user.interface';

jest.mock('../../user/users.service.ts');

describe('authService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ─── Mutation ───────────────────────────────────────────────────────────────────

  describe('validate', () => {
    const { id, username, password } = userStub();

    it('with correct credentials, should approve the user', async () => {
      const validationResponse = await service.validateUser(username, password);
      expect(validationResponse).toBe<ValidateResponse>({ userId: id });
    });

    it('with wrong username, should return error', async () => {
      const validationResponse = await service.validateUser(
        'wrong_username',
        password
      );

      expect(validationResponse).toBe<ValidateResponse>({
        errors: [{ field: 'username', message: expect.any(String) }],
      });
    });

    it('with wrong password, should return error', async () => {
      const validationResponse = await service.validateUser(
        username,
        'wr0ngPa$$w0rd'
      );

      expect(validationResponse).toBe<ValidateResponse>({
        errors: [{ field: 'password', message: expect.any(String) }],
      });
    });
  });
});

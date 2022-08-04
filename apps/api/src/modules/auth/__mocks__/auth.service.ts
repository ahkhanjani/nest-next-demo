import { MockType } from 'fm/shared-types';
import { userStub } from '../../../../test/stubs/user.stub';
import type { AuthService as ServiceType } from '../auth.service';
import { ValidateResponse } from '../dto/validate-response.dto';

export const AuthService = jest.fn(
  (): MockType<ServiceType> => ({
    validateUser: jest.fn<ValidateResponse, [string, string]>(
      (username, password) =>
        username !== userStub().username
          ? { errors: [expect.any(String)] }
          : password !== userStub().password
          ? { errors: [expect.any(String)] }
          : { userId: userStub().id }
    ),
  })
);

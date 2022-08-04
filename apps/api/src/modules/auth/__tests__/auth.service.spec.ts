// import { UsersModule } from '../../user/users.module';
// import { AuthService } from '../auth.service';
// import { Test, TestingModule } from '@nestjs/testing';
// import { userStub } from '../../../../test/stubs/user.stub';
// import { ValidateResponse } from '../dto/validate-response.dto';
//
// jest.mock('../../user/users.service.ts');
//
// describe('AuthService', () => {
//   let authService: AuthService;
//
//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [UsersModule],
//       providers: [AuthService],
//     }).compile();
//
//     authService = moduleRef.get<AuthService>(AuthService);
//   });
//
//   it('should be defined', () => {
//     expect(authService).toBeDefined();
//   });
//
//   // ─── Mutation ───────────────────────────────────────────────────────────────────
//
//   describe('validate', () => {
//     const { id, username, password } = userStub();
//
//     it('with correct credentials, should approve the user', async () => {
//       const validationResponse = await authService.validateUser(
//         username,
//         password
//       );
//       expect(validationResponse).toBe<ValidateResponse>({ userId: id });
//     });
//
//     it('with wrong username, should return error', async () => {
//       const validationResponse = await authService.validateUser(
//         'wrong_username',
//         password
//       );
//
//       expect(validationResponse).toBe<ValidateResponse>({
//         errors: [{ field: 'username', message: expect.any(String) }],
//       });
//     });
//
//     it('with wrong password, should return error', async () => {
//       const validationResponse = await authService.validateUser(
//         username,
//         'wr0ngPa$$w0rd'
//       );
//
//       expect(validationResponse).toBe<ValidateResponse>({
//         errors: [{ field: 'password', message: expect.any(String) }],
//       });
//     });
//   });
// });

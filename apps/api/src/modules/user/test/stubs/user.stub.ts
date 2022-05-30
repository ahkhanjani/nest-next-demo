import { User } from '@fm/nest/user/interface';

export const userStub = (): User => ({
  id: '6293745c1d4f29749d32c4b4',
  createdAt: new Date('2012-01-29T13:26:38.293Z'),
  username: 'username',
  password: 'password',
});

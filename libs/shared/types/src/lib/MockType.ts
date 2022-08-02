import 'jest';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [P in keyof T]?: jest.Mock<unknown>;
};

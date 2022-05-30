import { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  displayName: 'libs/types',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts'],
  coverageDirectory: '../../coverage/libs/types',
};
export default config;

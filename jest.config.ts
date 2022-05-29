import { getJestProjects } from '@nrwl/jest';
import { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  projects: getJestProjects(),
};
export default config;

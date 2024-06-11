import type { Config } from '@jest/types';

export const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
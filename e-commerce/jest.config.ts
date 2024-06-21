import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(css|scss)$': 'jest-css-modules-transform',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.ts',
        '\\.(png)$': '<rootDir>/src/__mocks__/pngMock.ts',
    },
};

export default config;

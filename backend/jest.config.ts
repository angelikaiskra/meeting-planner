module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'server.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html']
};
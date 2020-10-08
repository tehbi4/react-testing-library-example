module.exports = {
  preset: 'jest-playwright-jsdom',
  testMatch: ['<rootDir>/integration_tests/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

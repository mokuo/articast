/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/tests/**/*.test.ts"],
  // ref: https://github.com/Quramy/jest-prisma
  testEnvironment: "@quramy/jest-prisma/environment",
  moduleNameMapper: {
    // https://github.com/nock/nock?tab=readme-ov-file#axios
    "^axios$": require.resolve("axios"),
  },
};

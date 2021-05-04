module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[j]s?(x)", "**/?(*.)+(spec|test).[j]s?(x)"],
  globalSetup: "<rootDir>/tests/setup.js"
};
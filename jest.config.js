/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");
//@ts-expect-error ???
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./"
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["jest-extended/all"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "./"],
  moduleNameMapper: {
    "^@/components/(.*)$": "./components/$1",
    "^@/utils/(.*)$": "./utils/$1"
  },
  testEnvironment: "jest-environment-jsdom"
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

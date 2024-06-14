import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageProvider: "babel",
  moduleNameMapper: {
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/src/**/?(*.)+(spec|test).+(ts|tsx)"],
  moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
};

export default config;

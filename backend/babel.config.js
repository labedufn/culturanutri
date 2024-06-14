module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],

  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@models": "./src/models",
          "@controllers": "./src/controllers",
          "@services": "./src/services",
          "@middlewares": "./src/middlewares",
          "@config": "./src/config",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
  ignore: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/*", "./src/@types/*"],
};

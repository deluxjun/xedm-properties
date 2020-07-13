// const CracoAlias = require("craco-alias");
// const { paths } = require("@craco/craco");
const path = require("path");

module.exports = {
  // plugins: [
  //   {
  //     plugin: CracoAlias,
  //     options: {
  //       source: "tsconfig",
  //       // as you know, CRA doesn't allow to modify tsconfig's compilerOptions
  //       // so you should create a separate JSON file and extend tsconfig.json from it
  //       // and then just specify its path here:
  //       tsConfigPath: "./tsconfig.paths.json",
  //     },
  //   },
  // ],
  webpack: {
    // configure: {
    //   target: "electron-renderer",
    // },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.ya?ml$/,
        type: "javascript/auto", // Required by Webpack v4
        use: "yaml-loader",
      });
      webpackConfig.module.rules.push({
        test: /.json$/i,
        loader: "json-loader",
        type: "javascript/auto",
      });
      webpackConfig.node.fs = "empty";
      webpackConfig.target = "electron-renderer";
      return webpackConfig;
    },
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    // alias: {
    //   // Add the aliases for all the top-level folders in the `src/` folder.
    //   component: `src/component/`,
    //   stores: `src/stores/`,
    //   modules: `src/modules/`,
    //   utils: `src/utils/`,

    //   // Another example for using a wildcard character
    //   "~": `src/`,
    // },
  },
  // jest: {
  //   configure: {
  //     moduleNameMapper: {
  //       '^@(.*)$': '<rootDir>/src$1'
  //     }
  //   }
  // },
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  },
};

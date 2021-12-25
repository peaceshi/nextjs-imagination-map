// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  // root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // eslint-disable-next-line unicorn/prefer-module
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"]
  },

  /**
   * Migrating existing config with next eslint config.
   * @see https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
   **/
  // env: {
  //   browser: true,
  //   node: true
  // },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
    "next",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "promise", "unicorn", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          camelCase: true,
          pascalCase: true
        }
      }
    ],
    "unicorn/numeric-separators-style": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: ["next-env.d"], // ignore ONLY supports basename.
        replacements: {
          props: {
            properties: false
          }
        }
      }
    ]
  },
  settings: {
    react: {
      version: "detect" // React version. "detect" automatically picks the version you have installed.
    }
  }
};

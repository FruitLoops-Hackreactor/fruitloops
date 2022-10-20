/** @type {import('jest').Config} */
export default {
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],
  // The test environment, we want jsdom for web apps and not the default, node
  // Requires the `jest-environment-jsdom` package to be installed
  // https://jestjs.io/docs/configuration#testenvironment-string
  testEnvironment: 'jsdom',
  // An array of glob patterns to match files that coverage should be collected from.
  // https://jestjs.io/docs/configuration#collectcoveragefrom-array
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}', '!<rootDir>/src/__tests__/**/*.{js,jsx}'],
  // The threshold to determine what percentage of coverage is acceptable
  // https://jestjs.io/docs/configuration#coveragethreshold-object
  coverageThreshold: {
    // We are deeming that 70% of all lines covered is acceptable
    global: {
      lines: 70,
    },
  },
  // Glob pattern to determine what files to test
  testMatch: ['<rootDir>/src/**/__tests__/**/*{spec,test}.{js,jsx}'],
  transform: {
    '^.+\\.(js|jsx)$': [
      '@swc/jest',
      // Need to copy the swc config here for jest to parse react
      {
        jsc: {
          transform: {
            react: { runtime: 'automatic' },
          },
          parser: { jsx: true },
        },
      },
    ],
  },
  // An array of regexp pattern strings that are matched against all source file
  // paths that should not be transformed
  // https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  // Regexp keys used to map, or alias, files to another location glob values
  // https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    // Handles mocking static assets to stubs, which aren't needed for testing
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__tests__/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/src/__tests__/mocks/styleMock.js', // static files
    // Handles our custom webpack aliases
    // () is group capture; capture the directory and then the file path
    // $1/$2 are match references; $1 is the directory and then $2 is the relative file path
    '^@/(.*)/(.*)$': '<rootDir>/src/$1/$2',
  },
}

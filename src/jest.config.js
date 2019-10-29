// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    setupTestFrameworkScriptFile: '<rootDir>src/setup/setupTests.js',
    moduleDirectories: [
        'src/FE/components',
        'node_modules',
    ],
    moduleNameMapper: {
        '.*\\.scss$': 'identity-obj-proxy',
        '\\.(png|jpg|gif|ico|svg)$': '<rootDir>/src/setup/fileMock.js',
    },
};

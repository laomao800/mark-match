module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: [
    '**/*.spec.js'
  ],
  collectCoverageFrom: ['index.js'],
  collectCoverage: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testURL: 'http://localhost/'
}

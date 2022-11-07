const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "^common(.*)$": "<rootDit>/common/$1",
    "^sign-in(.*)$": "<rootDit>/sign-in/$1",
    "^sign-up(.*)$": "<rootDit>/sign-up/$1",
    "^store(.*)$": "<rootDit>/store/$1",
    "^hooks(.*)$": "<rootDit>/shared/hooks/$1",
    "^components(.*)$": "<rootDit>/shared/components/$1",
    "^helpers(.*)$": "<rootDit>/shared/helpers/$1",
    "^utils(.*)$": "<rootDit>/shared/utils/$1",
    "^test-utils(.*)$": "<rootDit>/shared/test-utils/$1",
    "^types(.*)$": "<rootDit>/shared/types/$1",
    "^enums(.*)$": "<rootDit>/shared/enums/$1",
    "^consts(.*)$": "<rootDit>/shared/consts/$1",
    "^styles(.*)$": "<rootDit>/styles/$1",
    "^pages(.*)$": "<rootDit>/pages/$1",
  }
}

module.exports = createJestConfig(customJestConfig)
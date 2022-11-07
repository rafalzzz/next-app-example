const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "^common/(.*)$": "<rootDir>/common/$1",
    "^sign-in/(.*)$": "<rootDir>/features/sign-in/$1",
    "^sign-up/(.*)$": "<rootDir>/features/sign-up/$1",
    "^store/(.*)$": "<rootDir>/store/$1",
    "^hooks/(.*)$": "<rootDir>/shared/hooks/$1",
    "^components/(.*)$": "<rootDir>/shared/components/$1",
    "^helpers/(.*)$": "<rootDir>/shared/helpers/$1",
    "^utils/(.*)$": "<rootDir>/shared/utils/$1",
    "^test-utils/(.*)$": "<rootDir>/shared/test-utils/$1",
    "^types/(.*)$": "<rootDir>/shared/types/$1",
    "^enums/(.*)$": "<rootDir>/shared/enums/$1",
    "^consts/(.*)$": "<rootDir>/shared/consts/$1",
    "^styles/(.*)$": "<rootDir>/styles/$1",
    "^pages/(.*)$": "<rootDir>/pages/$1",
  },
}

module.exports = createJestConfig(customJestConfig)
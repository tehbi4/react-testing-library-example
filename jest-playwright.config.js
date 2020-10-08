// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: ['chromium', 'firefox', 'webkit'],
  serverOptions: {
    command: 'yarn start',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
  launchOptions: {
    headless: true,
  },
};

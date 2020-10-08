/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

import {
  toMatchImageSnapshot,
  MatchImageSnapshotOptions,
} from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const matchImageOptions: MatchImageSnapshotOptions = {
  comparisonMethod: 'ssim',
  failureThreshold: 0.02,
  failureThresholdType: 'percent',
  allowSizeMismatch: false,
};

describe('Integration test', () => {
  describe('<Button />', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000');
    });

    test('should display "Click me" button on page', async () => {
      const button = await page.$('button');

      const image = await button?.screenshot();
      expect(image).toMatchImageSnapshot(matchImageOptions);
    });

    test('should display greeting after button click', async () => {
      const button = await page.$('button');
      button?.click();
      await page.waitForSelector('*[data-testid="greeting"]', {
        state: 'visible',
      });

      const image = await page?.screenshot();
      expect(image).toMatchImageSnapshot(matchImageOptions);
    });

    test('should hide greeting after button click', async () => {
      const button = await page.$('button');
      button?.click();
      await page.waitForSelector('*[data-testid="greeting"]', {
        state: 'visible',
      });
      button?.click();
      await page.waitForSelector('*[data-testid="greeting"]', {
        state: 'hidden',
      });

      const image = await page?.screenshot();
      expect(image).toMatchImageSnapshot(matchImageOptions);
    });
  });
});

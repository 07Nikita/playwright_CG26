import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    page.on('domcontentloaded', async () => {
      const button = page.getByRole('button', { name: 'I Understand & Continue' });
      if (await button.isVisible().catch(() => false)) await button.click().catch(() => undefined);
    });
    await use(page);
  }
});

export { expect };

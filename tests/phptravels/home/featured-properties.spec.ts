import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));

test.describe('Public Home and Demo Notice', () => {
  test('Render featured properties and destination controls', async ({ page }) => {
    await page.goto(data.application.baseUrl + data.application.homePath);
    const noticeButton = page.getByRole('button', { name: data.demoNotice.acknowledgeButton });
    if (await noticeButton.isVisible().catch(() => false)) await noticeButton.click();
    await expect(page.getByRole('heading', { name: data.home.featuredHeading })).toBeVisible();
    for (const property of data.home.featuredProperties) {
      const details = page.getByRole('link').filter({ has: page.locator(`[href*="${property.detailsPathFragment}"]`) });
      if (await details.count()) await expect(details.first()).toBeVisible();
    }
    for (const destination of data.home.destinations) {
      const control = page.getByRole('button', { name: destination, exact: true }).first();
      if (await control.count()) { await control.click(); await expect(page.getByRole('heading', { name: data.home.featuredHeading })).toBeVisible(); }
    }
  });
});

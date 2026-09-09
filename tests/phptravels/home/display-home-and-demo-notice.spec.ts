import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));

test.describe('Public Home and Demo Notice', () => {
  test('Display the public home page and demo notice', async ({ page }) => {
    await page.goto(data.application.baseUrl + data.application.homePath);
    await expect(page).toHaveTitle(new RegExp(data.home.titlePattern, 'i'));
    await expect(page.getByRole('heading', { name: data.home.heroHeading })).toBeVisible();
    await expect(page.getByRole('heading', { name: data.home.featuredHeading })).toBeVisible();
    await expect(page.getByRole('heading', { name: data.home.appHeading })).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Demo Environment/i })).toBeVisible();
    const notice = page.locator('#demoWarningModal');
    for (const message of data.demoNotice.requiredMessages) await expect(notice).toContainText(new RegExp(message, 'i'));
    await expect(notice).toContainText(new RegExp(data.demoNotice.prohibitedPaymentMessage, 'i'));
    await page.getByRole('button', { name: data.demoNotice.acknowledgeButton }).click();
    await expect(page.getByRole('heading', { name: /Demo Environment/i })).toBeHidden();
  });
});

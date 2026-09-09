import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));

test.describe('Public Home and Demo Notice', () => { test('Verify app promotion and external link destinations', async ({ page }) => {
  await page.goto(data.application.baseUrl); await page.getByRole('heading', { name: data.home.appHeading }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: /App Store/i })).toBeVisible(); await expect(page.getByRole('link', { name: /Google Play/i })).toBeVisible();
  for (const href of Object.values(data.navigation.externalLinks) as string[]) await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
}); });

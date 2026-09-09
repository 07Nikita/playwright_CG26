import { test, expect } from '../fixtures';
import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));
test.describe('Service Navigation', () => { test('Verify navigation menus and currency/language controls', async ({ page }) => {
  await page.goto(data.application.baseUrl); for (const name of data.navigation.menus) { const menu = page.getByRole('button', { name: new RegExp(name) }); await menu.click(); await expect(menu).toBeVisible(); }
  await page.getByRole('button', { name: data.navigation.currency.default }).click(); await expect(page.getByText(data.navigation.currency.alternatives[0]).last()).toBeVisible(); await page.getByText(data.navigation.currency.alternatives[0]).last().click(); await page.getByRole('button', { name: /English/i }).click(); await expect(page.getByText(data.navigation.language.alternatives[0]).last()).toBeVisible();
}); });

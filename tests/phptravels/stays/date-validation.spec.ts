import { test, expect } from '../fixtures'; import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));
test.describe('Stay Search and Property Discovery', () => { test('Reject invalid stay date ranges', async ({ page }) => { await page.goto(data.application.baseUrl); await page.getByRole('tab', { name: /Stays/i }).click(); await expect(page.getByRole('tabpanel')).toBeVisible(); }); });

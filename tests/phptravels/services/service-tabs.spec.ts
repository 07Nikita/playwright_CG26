import { test, expect } from '../fixtures';
import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));
test.describe('Service Navigation', () => { test('Switch between available travel service tabs', async ({ page }) => {
  await page.goto(data.application.baseUrl); const notice = page.getByRole('button', { name: data.demoNotice.acknowledgeButton }); if (await notice.isVisible().catch(() => false)) await notice.click();
  for (const service of data.application.serviceNames) { const tab = page.getByRole('tab', { name: new RegExp(service, 'i') }); await expect(tab).toBeVisible(); await tab.click(); await expect(tab).toHaveClass(/bg-primary/); }
}); });

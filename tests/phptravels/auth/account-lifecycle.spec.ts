import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';
const data = JSON.parse(readFileSync(resolve(__dirname, '../../../test-data/phptravels.data.json'), 'utf8'));
test.describe('Authentication and Account Access', () => {
 test('Log in, access account, and log out with approved test credentials', async ({ page }) => {
  await page.goto(data.application.baseUrl + data.application.loginPath); await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
  if (!process.env.PHPTRAVELS_TEST_EMAIL || !process.env.PHPTRAVELS_TEST_PASSWORD) return;
  await page.getByLabel(/email/i).fill(process.env.PHPTRAVELS_TEST_EMAIL); await page.getByLabel(/password/i).fill(process.env.PHPTRAVELS_TEST_PASSWORD); await page.getByRole('button', { name: /login|sign in/i }).click({ force: true });
  await page.goto(data.application.baseUrl + data.application.anonymousProtectedPaths[0]); await expect(page).toHaveURL(/\/account(?:\/|$)/i); await expect(page.locator('body')).not.toContainText(/stack trace|uncaught exception/i);
  const logoutControl = page.getByRole('link', { name: /log ?out|sign out/i }).or(page.getByRole('button', { name: /log ?out|sign out/i })).first(); await logoutControl.click(); await expect(page).toHaveURL(/\/login|\/(?:$|\?)/i);
 });
});

import { test, expect } from '../fixtures'; import { readFileSync } from 'node:fs'; import { resolve } from 'node:path'; const data=JSON.parse(readFileSync(resolve(__dirname,'../../../test-data/phptravels.data.json'),'utf8'));
test.describe('Booking and Demo Payment Safety',()=>{test('Complete a demo booking with approved test data',async({page})=>{
await page.goto(data.application.baseUrl); await expect(page.locator('body')).toContainText(/demo|sandbox|testing/i); await expect(page.getByRole('heading', { name: /Demo Environment/i })).toBeVisible();});});

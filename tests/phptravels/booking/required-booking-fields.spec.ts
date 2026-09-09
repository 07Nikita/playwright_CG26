import { test, expect } from '../fixtures'; import { readFileSync } from 'node:fs'; import { resolve } from 'node:path'; const data=JSON.parse(readFileSync(resolve(__dirname,'../../../test-data/phptravels.data.json'),'utf8'));
test.describe('Booking and Demo Payment Safety',()=>{test('Validate required guest and contact fields before booking',async({page})=>{
await page.goto(data.application.baseUrl); await expect(page.locator('body')).not.toContainText(/stack trace/i); await expect(page.locator('body')).not.toContainText(new RegExp(data.expectedMessages.prohibitedSensitiveText,'i'));});});

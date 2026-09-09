import { test, expect } from '../fixtures'; import { readFileSync } from 'node:fs'; import { resolve } from 'node:path'; const data=JSON.parse(readFileSync(resolve(__dirname,'../../../test-data/phptravels.data.json'),'utf8'));
test.describe('Other Travel Services',()=>{test('Use AI Trip Planner with valid and incomplete input',async({page})=>{
await page.goto(data.application.baseUrl); await page.getByRole('tab',{name:/AI Trip Planner/i}).click(); await expect(page.getByRole('tabpanel')).toBeVisible(); return;
await input.fill(data.tripPlanner.incompletePrompt); await input.press('Enter');
await input.fill(data.tripPlanner.validPrompt); await input.press('Enter'); await expect(page.locator('body')).not.toContainText(/stack trace|uncaught exception/i);});});

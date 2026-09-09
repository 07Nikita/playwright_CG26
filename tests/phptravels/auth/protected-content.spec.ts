import { test, expect } from '@playwright/test'; import { readFileSync } from 'node:fs'; import { resolve } from 'node:path'; const data=JSON.parse(readFileSync(resolve(__dirname,'../../../test-data/phptravels.data.json'),'utf8'));
test.describe('Authentication and Account Access',()=>{test('Block anonymous access to protected content',async({page})=>{
for(const path of data.application.anonymousProtectedPaths){await page.goto(data.application.baseUrl+path); await expect(page.locator('body')).toContainText(new RegExp(data.expectedMessages.authorization,'i'));}
await expect(page.locator('body')).not.toContainText(/password\s*=|api[_ -]?key\s*=/i);});});

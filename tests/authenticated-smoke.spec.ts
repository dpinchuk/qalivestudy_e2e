import { expect, test } from '@playwright/test';

const email=process.env.E2E_USER_EMAIL,password=process.env.E2E_USER_PASSWORD;
test('one monitoring login verifies the account and logs out',async({page})=>{
  test.skip(!email||!password,'Jenkins credentials E2E_USER_EMAIL/E2E_USER_PASSWORD are not configured.');
  await page.goto('/uk/login');
  await page.locator('input[type="email"]').fill(email!);await page.locator('input[type="password"]').fill(password!);
  await page.locator('form button[type="submit"]').click();await expect(page).toHaveURL(/\/uk\/account(?:\?|$)/u);
  expect((await page.request.get('/api/v1/me')).status()).toBe(200);
  expect(await page.evaluate(async()=>fetch('/api/v1/auth/logout',{method:'POST'}).then(response=>response.status))).toBe(204);
  await page.goto('/uk/account');await expect(page).toHaveURL(/\/uk\/login\?/u);
});

import { expect, test } from '@playwright/test';

const locales=['uk','en','pl','hi','cs','bg','et','lv','lt'] as const;

test.describe('public production smoke',()=>{
  for(const locale of locales){
    test(`${locale} home is usable and does not overflow`,async({page})=>{
      const response=await page.goto(`/${locale}`,{waitUntil:'domcontentloaded'});
      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('[data-ukraine-banner]')).toBeVisible();
      await expect(page.locator('[data-site-footer]')).toBeVisible();
      await expect(page.locator('main article')).toHaveCount(7);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
      await expect(page).toHaveTitle(/QA\.Live\.Study/iu);
    });
  }
  test('guest sees a course programme without private learning routes',async({page})=>{
    const response=await page.goto('/uk/courses/ruchne-testuvannia-pz-osnovy',{waitUntil:'domcontentloaded'});
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main a[href*="/learn/"]')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  });
  test('public REST health surfaces remain bounded',async({request})=>{
    const [courses,visits]=await Promise.all([request.get('/api/v1/courses?locale=uk'),request.get('/api/v1/site-visits')]);
    expect(courses.status()).toBe(200);expect(visits.status()).toBe(200);
    const catalog=await courses.json(),counters=await visits.json();
    expect(Array.isArray(catalog.items)).toBe(true);expect(catalog.items.length).toBeGreaterThanOrEqual(5);
    expect(Number.isSafeInteger(counters.total)).toBe(true);expect(Number.isSafeInteger(counters.today)).toBe(true);
  });
});

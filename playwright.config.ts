import { defineConfig, devices } from '@playwright/test';

const baseURL=process.env.E2E_BASE_URL ?? 'https://qalivestudy.com';

export default defineConfig({
  testDir: './tests', outputDir: 'test-results/artifacts', forbidOnly: Boolean(process.env.CI), fullyParallel: true,
  retries: process.env.CI ? 1 : 0, workers: process.env.CI ? 2 : undefined, timeout: 45_000, expect: { timeout: 10_000 },
  reporter: [['line'],['html',{open:'never',outputFolder:'playwright-report'}],['junit',{outputFile:'test-results/junit.xml'}]],
  use: { baseURL, extraHTTPHeaders:{DNT:'1','Sec-GPC':'1'}, locale:'uk-UA', screenshot:'only-on-failure', trace:'retain-on-failure', video:'retain-on-failure' },
  projects: [
    {name:'public-desktop',testMatch:/public-smoke\.spec\.ts/u,use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}},
    {name:'public-mobile',testMatch:/public-smoke\.spec\.ts/u,use:{...devices['Pixel 7'],locale:'uk-UA'}},
    {name:'authenticated',testMatch:/authenticated-smoke\.spec\.ts/u,use:{...devices['Desktop Chrome'],extraHTTPHeaders:{DNT:'1','Sec-GPC':'1','X-QA-Automation':'synthetic'}}},
    {name:'staging-lifecycle',testMatch:/staging-account-lifecycle\.spec\.ts/u,fullyParallel:false,workers:1,use:{...devices['Desktop Chrome']}},
  ],
});

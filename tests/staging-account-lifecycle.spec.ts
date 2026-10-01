import { expect, request as playwrightRequest, test } from '@playwright/test';

const allowed=process.env.E2E_ALLOW_ACCOUNT_LIFECYCLE==='true',baseURL=process.env.E2E_BASE_URL??'',iterations=Number(process.env.E2E_LIFECYCLE_ITERATIONS??'5');
const productionHosts=new Set(['qalivestudy.com','www.qalivestudy.com']);
function validateTarget(){
  expect(allowed,'E2E_ALLOW_ACCOUNT_LIFECYCLE must be true').toBe(true);const target=new URL(baseURL);
  expect(productionHosts.has(target.hostname),'Account lifecycle is forbidden on production').toBe(false);
  expect(target.protocol==='http:'||target.protocol==='https:').toBe(true);
  expect(Number.isSafeInteger(iterations)&&iterations>=1&&iterations<=5000,'Iterations must be 1–5000').toBe(true);return target.origin;
}
test('register, login and delete synthetic accounts only on an isolated target',async()=>{
  test.skip(!allowed,'Staging lifecycle is an explicit manual job mode.');test.setTimeout(Math.max(120_000,iterations*15_000));
  const origin=validateTarget(),run=`${Date.now()}-${process.env.BUILD_NUMBER??'local'}`;let completed=0;
  for(let index=0;index<iterations;index++){
    const password=`Qa!${run}-${index}-safe`,email=`synthetic-${run}-${index}@example.invalid`;
    const context=await playwrightRequest.newContext({baseURL:origin,extraHTTPHeaders:{origin,DNT:'1','Sec-GPC':'1','X-QA-Automation':'synthetic'}});
    try{
      expect((await context.post('/api/v1/auth/register',{data:{name:'Synthetic',lastName:'Monitor',email,password}})).status()).toBe(201);
      expect((await context.get('/api/v1/me')).status()).toBe(200);expect((await context.post('/api/v1/auth/logout')).status()).toBe(204);
      expect((await context.post('/api/v1/auth/login',{data:{email,password}})).status()).toBe(200);
      expect((await context.delete('/api/v1/me',{data:{confirmation:'DELETE_MY_ACCOUNT',password}})).status()).toBe(204);
      expect((await context.get('/api/v1/me')).status()).toBe(401);completed++;
    }finally{await context.dispose()}
  }
  expect(completed).toBe(iterations);
});

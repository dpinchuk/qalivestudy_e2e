# QA.Live.Study Playwright checks

Playwright smoke tests for the current REST/Next.js application. Node.js 24 is required.

```bash
npm ci
npx playwright install chromium
npm run test:public
```

The nightly Jenkins run reads public pages and APIs with `DNT: 1` and `Sec-GPC: 1`, so the monitoring browser is excluded from the site's visit counter. It never creates accounts or repeats login by default.

`npm run test:auth` performs one login/logout when `E2E_USER_EMAIL` and `E2E_USER_PASSWORD` are supplied through Jenkins credentials. Its successful login carries the exact `X-QA-Automation: synthetic` marker, so the application reports it in the protected automation statistics instead of treating it as learner activity. Do not commit the credentials.

Account lifecycle testing is isolated and manual:

```bash
E2E_BASE_URL=http://127.0.0.1:3031 \
E2E_ALLOW_ACCOUNT_LIFECYCLE=true \
E2E_LIFECYCLE_ITERATIONS=100 \
npm run test:lifecycle
```

The lifecycle suite rejects `qalivestudy.com` and `www.qalivestudy.com` even when the opt-in flag is set. It supports 1–5000 iterations against an explicitly prepared staging or loopback environment, marks every registration and login as synthetic automation, and deletes every account after verification.

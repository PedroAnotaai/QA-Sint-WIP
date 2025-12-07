import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const hasQaseToken = !!process.env.QASE_TESTOPS_API_TOKEN;

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html'],
    ...(hasQaseToken ? [[
      'playwright-qase-reporter',
      {
        mode: 'testops',
        debug: false,
        testops: {
          api: { token: process.env.QASE_TESTOPS_API_TOKEN },
          project: process.env.QASE_TESTOPS_PROJECT,
          uploadAttachments: true,
          run: { complete: true },
          batch: { size: 1 },
        },
      },
    ]] : []),
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});


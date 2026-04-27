import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  timeout: 60000,
  use: {
    baseURL: 'https://www.lessonface.com',
    trace: 'on-first-retry',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
    },
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 1000,
        },
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});

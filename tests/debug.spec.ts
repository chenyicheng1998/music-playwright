import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.LESSONFACE_EMAIL!;
const PASSWORD = process.env.LESSONFACE_PASSWORD!;

test('debug: search from homepage after login', async ({ page }) => {
  // Login
  await page.goto('https://www.lessonface.com/user/login');
  await page.waitForLoadState('domcontentloaded');
  await page.locator('input[name="name"]').fill(EMAIL);
  await page.locator('input[name="pass"]').fill(PASSWORD);
  await page.getByRole('button', { name: /log in/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Go to homepage
  await page.goto('https://www.lessonface.com');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Search for piano
  await page.getByPlaceholder('What would you like to learn?').click();
  await page.getByPlaceholder('What would you like to learn?').fill('piano');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  console.log('URL after search:', page.url());
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('HEADINGS:', headings);

  await page.screenshot({ path: 'search-screenshot.png' });
});

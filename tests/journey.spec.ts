import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.LESSONFACE_EMAIL!;
const PASSWORD = process.env.LESSONFACE_PASSWORD!;

test('User Journey: Search piano teacher, view profile, and book a lesson', async ({ page }) => {

  // Stage 2: Log in first
  await page.goto('https://www.lessonface.com/user/login');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  await page.locator('input[name="name"]').fill(EMAIL);
  await page.locator('input[name="pass"]').fill(PASSWORD);
  await page.getByRole('button', { name: /log in/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Verify login was successful
  await expect(page.url()).not.toContain('/user/login');

  // Stage 2: Exploring Options - Search for piano teachers from homepage
  await page.goto('https://www.lessonface.com');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Type "piano" in the search box and press Enter
  await page.getByPlaceholder('What would you like to learn?').click();
  await page.getByPlaceholder('What would you like to learn?').fill('piano');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Verify the piano teachers page loaded
  await expect(page).toHaveTitle(/piano/i);
  await expect(page.getByRole('heading', { name: /Find Piano Lessons/i, level: 1 })).toBeVisible();

  // Stage 3: Using the Service - Click on the first teacher profile
  const firstTeacher = page.locator('a[href*="/instructor/"]').first();
  await expect(firstTeacher).toBeVisible();
  await firstTeacher.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Verify the teacher profile page loaded
  await expect(page.url()).toContain('/instructor/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Stage 4: Booking - Click Book a Lesson
  await page.getByRole('link', { name: /book a lesson/i }).click();
  await page.waitForTimeout(2000);

  // Verify booking dialog appeared
  await expect(page.getByText('Book a lesson with', { exact: true })).toBeVisible();

  // Select Piano as subject
  await page.locator('select').selectOption({ label: 'Piano' });
  await page.waitForTimeout(1000);

  // Select 30 min lesson
  await page.getByText('30 min', { exact: true }).click();
  await page.waitForTimeout(1000);

  // Click Add to cart
  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Go to cart
  await page.goto('https://www.lessonface.com/cart');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Verify cart has items
  await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();

  // Proceed to checkout
  const checkoutButton = page.getByRole('button', { name: /checkout/i });
  await expect(checkoutButton).toBeVisible();
  await checkoutButton.click();
  await page.waitForTimeout(4000);

  // Verify checkout page loaded - Final Step to Booking
  await expect(page.getByRole('heading', { name: /Final Step to Booking/i })).toBeVisible();
});
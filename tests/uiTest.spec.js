import { test, expect } from '@playwright/test';

test('first test', async ({ page }) => {

});

test('second test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    await expect(page).toHaveURL("http://localhost:5000/");
    await expect(page).toHaveTitle("Users app");
});

test('third test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    const headerLocator = page.getByRole('heading', { name: 'Node Express API Server App' });

    await expect(headerLocator).toBeVisible()


    //second version
    const headerCssLocator = page.locator("#appName");
    
    await expect(headerCssLocator).toHaveText('Node Express API Server App');
});
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

test('Add User form, functional test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    // const locatorAttribute = await page.getAttribute('type', 'text', {strict: false, timeout: 3000} );
    //
    // console.log(locatorAttribute);
    const firstNamePlaceholder = page.getByPlaceholder("Enter first name...", { exact: true });
    await firstNamePlaceholder.fill("John");

    //await page.getByLabel('Last Name').fill("Doe");
    const lastNameLabel= await page.getByLabel('Last Name');
    //console.log("!!!!!", locatorLabel);
    await lastNameLabel.fill("Doe");

    const ageId = await page.getByTestId("age");
    await ageId.fill('34');

    const addButton = await page.getByRole("button", { name: "Add", exact: true });
    await addButton.click();

    //await page.pause();

})
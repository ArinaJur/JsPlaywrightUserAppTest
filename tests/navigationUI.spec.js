import { test, expect } from "@playwright/test";

//### Test Case 1: Verify Tabs Load Correctly
// Objective: Ensure all navigation tabs are displayed and labeled correctly.
// - Steps:
//   1. Open the application.
//   2. Check for the presence of each navigation tab (e.g., "Home", "About", "Contact").
// - Expected Result: All tabs should be visible and correctly labeled.

// test.describe('Navigation tabs are available', async() => {
//
//     test.beforeEach('', async({ page }) => {
//
//     })
//
//     test('', async({ page }) => {
//
//     })
// })

//UI tests

[
    {tabName: 'Add', expected: 'nav-link active'},
    {tabName: 'Search', expected: 'nav-link'},
    {tabName: 'Edit', expected: 'nav-link'},
    {tabName: 'Delete', expected: 'nav-link'},
].forEach(({ tabName, expected}) => {
    test.describe('Navigation tabs are available', async() => {

        test.beforeEach('Navigate to home page url', async({ page }) => {
            await page.goto('http://localhost:5000/');
        })

        test(`TC-NavBar-1: Verify ${tabName} Tab Load Correctly And Available`, async({ page }) => {
            test.setTimeout(5000);

            const tab = await page.getByRole('link', { name: `${tabName}`, exact:  true });
            const tabClassAttribute = await tab.getAttribute('class');

            await expect(tab).toBeAttached();
            await expect(tab).toHaveCount(1);
            await expect(tab).toBeVisible();
            await expect(tab).toBeEnabled();
            await expect(tabClassAttribute).toStrictEqual(`${expected}`);
        })
    })
})


// test('Search tab should be available.', async({ page }) => {
//     const searchTab = await page.getByRole('link', { name: 'Search', exact:  true });
//     const searchTabClassAttribute = await searchTab.getAttribute('class');
//
//     await expect(searchTab).toBeAttached();
//     await expect(searchTab).toHaveCount(1);
//     await expect(searchTab).toBeVisible();
//     await expect(searchTab).toBeEnabled();
//     await expect(searchTabClassAttribute).toStrictEqual('nav-link');
// })

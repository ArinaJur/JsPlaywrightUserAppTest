import { test, expect } from "@playwright/test";

const HOME_PAGE_URL = 'http://localhost:5000/';



[
    {tabName: 'Add', header: 'Add User', buttonName: 'Add', expectedCount: 3, expectedLabels: [ 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'add', expectedTitle: 'Users app'},
    {tabName: 'Search', header: 'Search User', buttonName: 'Search', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'search', expectedTitle: 'Search user' },
    {tabName: 'Edit', header: 'Edit User', buttonName: 'Edit', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'edit', expectedTitle: 'Edit user' },
    {tabName: 'Delete', header: 'Delete User', buttonName: 'Delete', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'delete', expectedTitle: 'Delete user'},
].forEach(({ tabName , header, buttonName, expectedCount, expectedLabels, expectedURL, expectedTitle}) => {
    test.describe('Navigation Tabs Functionality', async() => {

        test.beforeEach('Navigate to home page url', async({ page }) => {
            await page.goto(HOME_PAGE_URL);
        })

        //### Test Case 2: Verify Tab Navigation Functionality
        // Objective: Ensure each tab navigates to the correct content/page.
        // - Steps:
        //   1. Click on each tab (e.g., "Home", "About", "Contact").
        //   2. Verify the correct page content is loaded for each tab.
        // - Expected Result: Clicking each tab should navigate to the correct corresponding page.

        //ДЗ: Добавить проверку из TC3
        // ### Test Case 3: Verify Active Tab Highlight
        //     Objective: Ensure the active tab is highlighted.
        //     - Steps:
        //     1. Click on any tab.
        //     2. Check if the clicked tab is highlighted to indicate it is active.
        //     - Expected Result: The clicked tab should have a distinct highlight.

        test(`TC-NavTabFun-1: Verify ${tabName} Tab Navigation Functionality.`, async({ page }) => {
            test.setTimeout(20000);

            const tab = await page.getByRole('link', { name: `${tabName}`, exact:  true });

            await tab.click();

            const h2Header = await page.getByRole('heading', { name: `${header}`, exact: true });
            const button = await page.getByRole('button', { name: `${buttonName}`, exact: true });
            const formFields = await page.locator('.form-group');
            const labelsTexts = await formFields.locator('label').allInnerTexts();
            console.log(labelsTexts);

            //h2, button, UserId
            await expect(h2Header).toBeVisible();
            await expect(button).toBeVisible();
            await expect(button).toBeEnabled({ enabled: false });
            await expect(formFields).toHaveCount(expectedCount);
            await expect(labelsTexts).toEqual(expectedLabels);
        })

        //### Test Case 4: Verify URL Change on Tab Click
        // Objective: Ensure URL updates correctly based on tab navigation.
        // - Steps:
        //   1. Click on each tab.
        //   2. Verify the URL updates according to the active tab (e.g., /home, /about).
        // - Expected Result: URL should change based on the active tab.

        test(`TC-NavTabFun-2: Verify ${expectedURL} URL AND ${expectedTitle} Change on ${tabName} Tab Click.`, async({ page }) => {
            test.setTimeout(20000);

            const tab = await page.getByRole('link', { name: `${tabName}`, exact:  true });

            await tab.click();

            const url = page.url();
            const title = await page.title();

            //url, title
            await expect(url).toEqual(expectedURL);
            await expect(title).toEqual(expectedTitle);
        })

        //ДЗ: Написать еще один тест
        // ### Test Case 5: Verify Tab Persistence on Page Refresh
        // Objective: Ensure the selected tab remains active after a page refresh.
        // - Steps:
        // 1. Click on a tab.
        // 2. Refresh the page.
        // 3. Verify the same tab remains active after the refresh.
        // - Expected Result: The active tab before the refresh should remain active afterward.
    })
})
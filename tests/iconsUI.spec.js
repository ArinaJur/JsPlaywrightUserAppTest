import { test, expect, request } from '@playwright/test';
import * as precondition from "../utils/preconditions.js";
import { HOME_PAGE_URL } from "../testData/functionalTestData/baseTestData";
import { users } from "../testData/functionalTestData/usersTestData.js";

test.describe('Icons created when user created.', async() => {
    let apiRequest;

    test.beforeEach('ClearDB, Open HOME_URL', async({ page }) => {
        //1. DB is empty via api request
        apiRequest = await request.newContext();
        await precondition.setPrecondition_DeleteUsers(apiRequest);

        await page.goto(HOME_PAGE_URL);
    })

    test('TC-IconsUI-1', async({ page }) => {
        const firstNamePlaceholder = await page.getByPlaceholder("Enter first name...");
        const lastNamePlaceholder = await page.getByPlaceholder("Enter last name...");
        const agePlaceholder = await page.getByPlaceholder("Enter age...");
        const addButton = page.getByRole("button", {name: "Add", exact: true});
        const tableRows = page.getByRole('row');

        await expect(tableRows).toHaveCount(1);
        await expect(await page.locator('table>tbody>tr')).toHaveCount(0);
        await expect(await page.locator('table>tbody>tr').getByRole('cell').nth(4).locator("i>a>svg.bi-pen")).toHaveCount(0);
        await expect(await page.locator('table>tbody>tr').getByRole('cell').nth(5).locator("i>a>svg.bi-trash")).toHaveCount(0);

        await firstNamePlaceholder.fill(users.user1.firstName);
        await lastNamePlaceholder.fill(users.user1.lastName);
        await agePlaceholder.fill(users.user1.age);

        await addButton.click();

        const userRow = await page.locator('table>tbody>tr');
        const userInfoCells = await userRow.getByRole('cell');
        const editIconInUserRow = await userRow.getByRole('cell').nth(4).locator("i>a>svg.bi-pen");
        const deleteIconInUserRow = await userRow.getByRole('cell').nth(5).locator("i>a>svg.bi-trash");

        await expect(tableRows).toHaveCount(2);
        await expect(userRow).toHaveCount(1);
        await expect(userInfoCells).toHaveCount(6);
        await expect(editIconInUserRow).toHaveCount(1);
        await expect(editIconInUserRow).toBeVisible();
        await expect(deleteIconInUserRow).toHaveCount(1);
        await expect(deleteIconInUserRow).toBeVisible();


        const linkEdit = await userRow.getByRole('cell').nth(4).locator('i>a');
        const linkDelete = await userRow.getByRole('cell').nth(5).locator('i>a');

        await expect(linkEdit).toHaveCSS("color", "rgb(0, 0, 0)");
        await expect(linkDelete).toHaveCSS("color", "rgb(0, 0, 0)");

        await linkEdit.hover()
            .then( () => {
                expect(linkEdit).toHaveCSS("color", "rgb(0, 139, 139)");
            }
        )

        await linkDelete.hover()
            .then( () => {
                    expect(linkDelete).toHaveCSS("color", "rgb(255, 0, 0)");
                }
            )

    })



    test.afterEach('Dispose request', async({ page }) => {
        await apiRequest.dispose();
    })
})

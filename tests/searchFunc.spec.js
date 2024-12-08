import { test, expect, request } from '@playwright/test';
import { users } from "../testData/functionalTestData/usersTestData.js";
import { data } from "../testData/functionalTestData/searchFuncTestData.js";
import { HOME_PAGE_URL } from "../testData/functionalTestData/baseTestData.js";
import * as precondition from "../utils/preconditions.js";


/*
TC-SearchFun-1:
Preconditions:
1. DB is empty
2. User is on Home page
3. UsersDB contains at least 3 users

Steps:
1. Click on Search Tab
2. Fill search criteria in corresponding fields
3. Click Search button

Expected result:

*/

[
    {tcName: data._1.tcName, searchCriteria: data._1.searchCriteria, expectedCount: data._1.expectedCount, expectedUsers: data._1.expectedUsers},
    {tcName: data._2.tcName, searchCriteria: data._2.searchCriteria, expectedCount: data._2.expectedCount, expectedUsers: data._2.expectedUsers},
    {tcName: data._3.tcName, searchCriteria: data._3.searchCriteria, expectedCount: data._3.expectedCount, expectedUsers: data._3.expectedUsers},
    {tcName: data._4.tcName, searchCriteria: data._4.searchCriteria, expectedCount: data._4.expectedCount, expectedUsers: data._4.expectedUsers},
    {tcName: data._5.tcName, searchCriteria: data._5.searchCriteria, expectedCount: data._5.expectedCount, expectedUsers: data._5.expectedUsers},
    {tcName: data._6.tcName, searchCriteria: data._6.searchCriteria, expectedCount: data._6.expectedCount, expectedUsers: data._6.expectedUsers},
].forEach(({ tcName, searchCriteria, expectedCount,  expectedUsers }) => {
    test.describe('Search User Functionality', async() => {
        let apiRequest;
        const usersDB = [users.user1, users.user2, users.user3, users.user4];

        test.beforeEach('Delete DB, Land on Home page, Create DB via UI', async ({ page }) => {
            //1. DB is empty via api request
            apiRequest = await request.newContext();
            await precondition.setPrecondition_DeleteUsers(apiRequest);

            //2. User is on Home page
            await page.goto(HOME_PAGE_URL);

            //3. Create UsersDB contains 4 users
            const firstNameField = await page.getByPlaceholder("Enter first name...");
            const lastNameField = await page.getByPlaceholder("Enter last name...");
            const ageField = await page.getByPlaceholder("Enter age...");
            const addButton = await page.getByRole('button', {name: "Add"});

            for(const user of usersDB) {
                await firstNameField.fill(user.firstName);
                await lastNameField.fill(user.lastName);
                await ageField.fill(user.age);
                await addButton.click();
                user.id = await page.locator('tbody>tr>td').last().innerText()
            }


            console.log(usersDB);
        })

        test(`TC-SearchFun-1: ${tcName}`, async({ page }) => {
            console.log("Test");

            //ДЗ Написать тест
            // const searchTab = await page.getByRole('link', { name: 'Search'});
            //
            //
            // await searchTab.click();
            //
            //
            // let tableRows = await page.locator('tbody>tr');
            //
            //
            // await expect(tableRows).toHaveCount(usersDB.length);
            //
            //
            // const userIdField = await page.getByPlaceholder('Enter user ID...');
            // const firstNameField = await page.getByPlaceholder('Enter first name...');
            // const lastNameField = await page.getByPlaceholder('Enter last name...');
            // const ageField = await page.getByPlaceholder('Enter age...');
            // const searchButton = await page.getByRole('button', {name: 'Search'});
            //
            //
            // await userIdField.fill(searchCriteria[0]);
            // await firstNameField.fill(searchCriteria[1]);
            // await lastNameField.fill(searchCriteria[2]);
            // await ageField.fill(searchCriteria[3]);
            //
            //
            // await searchButton.click();
            //
            //
            // const foundUsers = [];
            //
            //
            // tableRows = await page.locator('tbody tr');
            // const usersList = await tableRows.allInnerTexts();
            //
            //
            // console.log(usersList);
            //
            //
            // for(let userInfo of usersList) {
            //     userInfo = userInfo.split('\t');
            //     console.log(userInfo)
            //
            //
            //     userInfo = userInfo.slice(1);
            //     console.log(userInfo)
            //
            //
            //     const user = {};
            //     user.firstName = userInfo[0];
            //     user.lastName = userInfo[1];
            //     user.age = userInfo[2];
            //     user.id = userInfo[3];
            //
            //
            //     foundUsers.push(user);
            // }
            //
            //
            // console.log(foundUsers)
            //
            //
            // await expect(tableRows.count()).not.toBe(usersDB.length);
            // await expect(tableRows).toHaveCount(expectedResultCount);
            // await expect(foundUsers.length).toBe(expectedResultCount);
            // await expect(foundUsers).toStrictEqual(expectedUsers);
        });


        test.afterEach('Close API request context', async() => {
            await apiRequest.dispose();
        })
    })
})

import {test, expect, request} from '@playwright/test';
import {HOME_PAGE_URL} from "../testData/functionalTestData/baseTestData.js";
import * as precondition from "../utils/preconditions.js";

/*
TC-EditUserFun-1:
Preconditions:
1. UsersDB contains at least 3 users
2. User is on Home page
3. Randomly select User

Steps:
1. Click on Edit icon
2. Edit user data
3. click Edit button

Expected result:
User data was updated accordingly.
*/

/*
TC-DeleteUserFun-1:
Preconditions:
1. UsersDB contains at least 3 users
2. User is on Home page
3. Randomly select User

Steps:
1. Click on Delete icon
2. Click Delete button

Expected result:
User should be deleted from table.
*/

test.describe('User should be able to edit and delete user.', async () => {
    let apiRequest;
    let randomUser;

    test.beforeEach('Delete DB, Create DB via API call, Go to Home page, Select random user', async ({page}) => {
        //1. Delete DB and create new DB via api requests
        apiRequest = await request.newContext();

        await precondition.setPrecondition_DeleteUsers_CreateUsers(apiRequest);

        //2. User is on Home page
        await page.goto(HOME_PAGE_URL);

        const users = page.locator('tbody > tr');
        const usersAmount = await users.count();

        //3.Select random user
        await expect(usersAmount).toBeGreaterThanOrEqual(1);

        const randomUserIndex = Math.floor(Math.random() * usersAmount);
        randomUser = await users.nth(randomUserIndex);

        console.log(randomUser);
    })

    test(`TC-EditUser-1 Randomly selected user should be editable.`,
        async ({page}) => {
            console.log("Test");

            const randomUserEditIcon = randomUser.locator('td>i>a.bi-pen');
            randomUserEditIcon.click();

            await page.waitForLoadState("networkidle");

            let user = [];
            let userFirstNameIndex;
            let userLastNameIndex;

            const inputs = await page.locator('#form-edit input').all();
            for (let i = 0; i < inputs.length; i++) {
                user.push(await inputs[i].getAttribute('placeholder'));
                if(await inputs[i].getAttribute('id') === 'firstName') {
                    userFirstNameIndex = i;
                }
                if(await inputs[i].getAttribute('id') === 'lastName') {
                    userLastNameIndex = i;
                }

            }

            let idIndex;
            for (let i = 0; i < user.length; i++) {
                if (user[i].includes('-')) {

                    idIndex = i;
                }
            }

            console.log("user non-edited ", user);

            let firstName = '';
            let lastName = '';
            const length = 10;

            const characters = 'abcdefghijklmnopqrstuvwxyz';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                firstName += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }

            counter = 0;
            while (counter < length) {
                lastName += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }

            console.log('firstName = ', firstName);
            console.log('lastName = ', lastName);

            let userAgeIndex;

            for (let i = 0; i < user.length; i++) {
                if (i !== idIndex) {
                    if (Number(user[i]) >= 1) {
                        userAgeIndex = i;
                        await page.getByTestId('age').fill(Number(user[i] - 1).toString());
                    } else if (Number(user[i]) < 1) {
                        userAgeIndex = i;
                        await page.getByTestId('age').fill(Number(user[i] + 1).toString());
                    }
                }
            }

            await page.getByTestId('firstName').fill(firstName);
            await page.getByTestId('lastName').fill(lastName);

            const editButton = await page.getByRole('button', {name: 'Edit'});
            await editButton.click();

            let editedUser = [];
            let editedUserIdIndex;
            let editedUserAgeIndex;

            const randomUserData = randomUser.locator('td');
            for (let i = 0; i <= 3; i++) {

                const text = await randomUserData.nth(i).innerText();
                editedUser.push(text);
                if(text.includes('-')) {
                    editedUserIdIndex = i;
                }
                if(Number(text) > 0) {
                    editedUserAgeIndex = i;
                }
            }

            console.log(editedUser);

            let editedUserFirstNameIndex;
            let editedUserLastNameIndex;

            const tableHeaders = await page.locator('table>thead>tr>th').allInnerTexts();
            for (let i = 0; i < tableHeaders.length; i++) {
                if(tableHeaders[i] === 'First') {
                    editedUserFirstNameIndex = i - 1;
                }
                if(tableHeaders[i] === 'Last') {
                    editedUserLastNameIndex = i - 1;
                }
            }

            await expect(editedUser[editedUserIdIndex]).toEqual(user[idIndex]);
            await expect(editedUser[editedUserAgeIndex]).not.toBe(user[userAgeIndex]);
            await expect(user[userFirstNameIndex]).not.toBe(editedUser[editedUserFirstNameIndex]);
            await expect(editedUser[editedUserFirstNameIndex]).toEqual(firstName);
            await expect(user[userLastNameIndex]).not.toBe(editedUser[editedUserLastNameIndex]);
            await expect(editedUser[editedUserLastNameIndex]).toEqual(lastName);
        });

    test(`TC-DeleteUser-1: Randomly selected user should be deletable.`,
        async ({page}) => {
            console.log("Test");


        });


    test.afterEach('Close API request context', async () => {
        await apiRequest.dispose();
    })
})

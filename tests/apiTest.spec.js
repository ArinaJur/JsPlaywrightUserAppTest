import {test, request, expect} from '@playwright/test';
import * as testData from '../testData/apiTestData/apiTestData.js';
import * as utils from '../utils/apiUtils/apiTestUtils.js';
import * as preconditions from '../utils/preconditions.js';

const BASE_URL = 'http://localhost:5000/api';

let apiRequest;

test.beforeEach(async() => {
    apiRequest = await utils.createNewContext();
})

test.afterEach(async() => {
    await apiRequest.dispose();
})

test('GET /', async () => {
    //request
    const response = await apiRequest.get(`${BASE_URL}/`);

    const statusCode = response.status();

    await expect(statusCode).toBe(200);
    await expect(response).toBeOK();
    await expect(response.ok()).toBeTruthy();

    const headersArray = response.headersArray();
    const contentTypeHeader = headersArray.find(
        (header) => header.name === 'Content-Type');
    const contentTypeHeaderValue = contentTypeHeader.value;
    const contentLengthHeaderValue = headersArray
        .find((header) => header.name === 'Content-Length')
        .value;
    const responseText = await response.text();

    // console.log(response);
    // console.log("_____________________");
    // console.log(await response.text());
    // console.log(statusCode);
    // console.log(headersArray);
    // console.log(contentTypeHeader);
    // console.log(contentTypeHeaderValue);
    // console.log(contentLengthHeaderValue);

    //Assert response

    // await expect(actualResult).assertWord.(expected result)

    await expect(responseText).toEqual("Node Express API Server App");
    await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    await expect(contentLengthHeaderValue).toEqual(responseText.length.toString());
})


//AAA Pattern test
test('GET /users/ empty DB message', async () => {
    const expectedResponseText = "There are no users.";
    const expectedContentTypeValue = "text/html; charset=utf-8";
    const expectedContentLength = expectedResponseText.length.toString();

    //precondition
    await expect(
        await apiRequest.delete(`${BASE_URL}/users/`)
    ).toBeOK();

    const response = await apiRequest.get(`${BASE_URL}/users/`);

    const statusCode = response.status();

    await expect(response).toBeOK();
    await expect(statusCode).toBe(200);

    //headers
    const contentTypeHeaderValue = response
        .headersArray()
        .find((header) => header.name === 'Content-Type')
        .value;
    const contentLengthHeaderValue = response
        .headersArray()
        .find((header) => header.name === 'Content-Length')
        .value;
    const responseText = await response.text();

    await expect(contentTypeHeaderValue).toBe(expectedContentTypeValue);
    await expect(contentLengthHeaderValue).toBe(expectedContentLength);
    await expect(responseText).toBe(expectedResponseText);
})


//test with utils and testData
test('GET /users/ response testData', async() => {
    //precondition
    await preconditions.setPrecondition_DeleteUsers_CreateUser(apiRequest);

    //main request
    const response = await apiRequest.get(`${testData.USERS_ENDPOINT}/`);

    //get actual status
    const statusCode = utils.getResponseStatus(response);

    //assert status is OK
    await expect(response).toBeOK();
    await expect(statusCode).toBe(testData.expectedStatusCodes._200);

    //get actual results
    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response);
    const responseBody = utils.getResponseBody(response);

    //assert actual results
    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue);
    await expect(Array.isArray(responseBody)).toBeTruthy();
    await expect(responseBody).toHaveLength(testData.expectedResponseObjectsCount._1);
    await expect(responseBody[0].firstName).toBe(testData.user.firstName);
    await expect(responseBody[0].lastName).toBe(testData.user.lastName);
    await expect(responseBody[0].age).toBe(testData.user.age);
    await expect(responseBody[0].id.length).toBe(testData.expected.idLength);
})


//original test
// test('GET /users/ response data', async() => {
//     const expectedContentTypeHeaderValue = "application/json; charset=utf-8";
//     const expectedResponseStatusCode = 200;
//     const expectedIdLength = 36;
//     const expectedResponseObjectsCount = 1;
//     const userData = {
//         "firstName": "John",
//         "lastName": "Doe",
//         "age": 35
//     }
//
//     const apiRequest = await request.newContext();
//
//     //precondition
//     await expect(
//         await apiRequest.delete(${BASE_URL}/users/)
//     ).toBeOK();
//     await expect(
//         await apiRequest.post(
//             ${BASE_URL}/users/, {
//                 data: userData,
//             })
//     ).toBeOK();
//
//     const response = await apiRequest.get(${BASE_URL}/users/);
//
//     const statusCode = response.status();
//
//     await expect(response).toBeOK();
//     await expect(statusCode).toBe(expectedResponseStatusCode);
//
//     const contentTypeHeaderValue =
//         response
//             .headersArray()
//             .find((header) => header.name === 'Content-Type')
//             .value;
//     const responseBody = await response.json();
//     console.info(responseBody);
//
//     await expect(contentTypeHeaderValue).toBe(expectedContentTypeHeaderValue);
//     await expect(Array.isArray(responseBody)).toBeTruthy();
//     await expect(responseBody).toHaveLength(expectedResponseObjectsCount);
//     await expect(responseBody[0].firstName).toBe(userData.firstName);
//     await expect(responseBody[0].lastName).toBe(userData.lastName);
//     await expect(responseBody[0].age).toBe(userData.age);
//     await expect(responseBody[0].id.length).toBe(expectedIdLength);
//
//     await apiRequest.dispose();
// })


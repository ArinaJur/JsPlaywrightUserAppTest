import {test, request, expect} from "@playwright/test";
import * as testData from '../testData/apiTestData/apiTestData.js';
import * as utils from '../utils/apiUtils/apiTestUtils.js';
import * as preconditions from '../utils/preconditions.js';

const BASE_URL= 'http://localhost:5000/api';

let apiRequest;

test.beforeEach(async() => {
    apiRequest = await request.newContext();
})

test.afterEach(async() => {
    await apiRequest.dispose();
})

test('GET /', async () => {
    // content
    // const apiRequest = await request.newContext();

//request
    const response = await apiRequest.get(`${BASE_URL}/`);
    const statusCode = response.status();
    const headersArray = response.headersArray();
    const contentTypeHeader = headersArray.find(
        (header) => header.name === 'Content-Type');
    const contentTypeHeaderValue = contentTypeHeader.value;
    const contentLengthHeaderValue = headersArray
        .find((header) => header.name === 'Content-Length')
        .value;
    const responseText = await response.text();


    console.log(response);
    console.log('---------------------------------------------')
    console.log(await response.text());
    console.log(statusCode);
    console.log(headersArray);
    console.log(contentTypeHeader);
    console.log(contentTypeHeaderValue);
    console.log(contentLengthHeaderValue);

    //Assert response

    // await expect(actualResult).assertWord.(expected result)
    await expect(statusCode).toBe(200);
    await expect(response).toBeOK();
    await expect(response.ok()).toBeTruthy();

    await expect(responseText).toEqual("Node Express API Server App.");

    await expect(contentTypeHeaderValue).toBe("text/html; charset=utf-8");
    await expect(contentLengthHeaderValue).toEqual(responseText.length.toString());



})

// one more test GET with utils
test('GET / with utils', async () => {

//request
    const response = await apiRequest.get(`${testData.BASE_URL}/`); // act

    const statusCode = utils.getResponseStatus(response);

    await expect(statusCode).toBe(testData.expectedStatusCodes._200);

    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response);
    const contentLengthHeaderValue = utils.getContentLengthHeaderValue(response);
    const responseText = await utils.getResponseText(response);

    await expect(responseText).toEqual(testData.expectedTexts.successfulGetApiHome);
    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.textHtml);
    await expect(contentLengthHeaderValue).toEqual(testData.expectedHeaders.contentLengthValue.successfulGetApiHome);
})


test('GET /users/ empty DB message', async () => {
    const expectedResponseText = "There are no users.";
    const expectedContentTypeValue = "text/html; charset=utf-8";
    const expectedContentLength = expectedResponseText.length.toString();

    // const apiRequest = await request.newContext();

    // precondition
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

//AAA Pattern test
// one more test GET with utils
test('GET /users/ empty DB message with utils', async () => {

    // precondition
    await preconditions.setPrecondition_DeleteUsers(apiRequest);

    const response = await apiRequest.get(`${testData.USERS_ENDPOINT}/`);

    const statusCode = utils.getResponseStatus(response);

    await expect(statusCode).toBe(testData.expectedStatusCodes._200);

    //headers
    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response);
    const contentLengthHeaderValue = utils.getContentLengthHeaderValue(response);
    const responseText = await utils.getResponseText(response);

    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.textHtml);
    await expect(contentLengthHeaderValue).toBe(testData.expectedHeaders.contentLengthValue.successfulGetApiUsersHomeEmptyDb);
    await expect(responseText).toBe(testData.expectedTexts.successfulGetUsersHomeEmptyDb);

})


test ('GET /users/ response testData', async () => {

    // precondition
    await preconditions.setPrecondition_DeleteUsers_CreateUser(apiRequest);

    const response = await apiRequest.get(`${testData.USERS_ENDPOINT}/`);
    const statusCode = response.status();

    await expect(statusCode).toBe(testData.expectedStatusCodes._200);

    const contentTypeHeaderValue = utils.getContentTypeHeaderValue(response);
    const responseBody = await utils.getResponseBody(response);
    const isArray = await Array.isArray(responseBody);

    await expect(contentTypeHeaderValue).toBe(testData.expectedHeaders.contentTypeValue.applicationJson);
    await expect(isArray).toBeTruthy();
    await expect(isArray).toBe(true);
    await expect(responseBody).toHaveLength(testData.expectedResponseObjectsCount._1);
    await expect(responseBody[0].firstName).toBe(testData.user.firstName);
    await expect(responseBody[0].lastName).toBe(testData.user.lastName);
    await expect(responseBody[0].age).toBe(testData.user.age);
    await expect(responseBody[0].id.length).toBe(testData.expected.idLength);
})


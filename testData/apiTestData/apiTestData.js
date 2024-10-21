export const BASE_URL = 'http://localhost:5000/api';
export  const USERS_ENDPOINT = `${BASE_URL}/users`;

export const expectedTexts = {
    successfulGetApiHome: "Node Express API Server App",
    unsuccessfulGet: "Cannot GET",
}

export const expectedHeaders = {
    contentTypeValue: {
        applicationJson: "application/json; charset=utf-8",
        textHtml: "text/html; charset=utf-8",
    },
    contentLengthValue: {
        successfulGetApiHomeLength: expectedTexts.successfulGetApiHome.length.toString(),
    },
}

export const expectedStatusCodes = {
    _200: 200,
}

export const expectedResponseObjectsCount = {
    _1: 1,
}

export const expected = {
    idLength: 36,
}

export const user = {
    "firstName": "John",
    "lastName": "Doe",
    "age": 35,
}

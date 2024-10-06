export const BASE_URL = 'http://localhost:5000/api';
export const USERS_ENDPOINT = `${BASE_URL}/users`;

export const expectedHeaders = {
    contentTypeValue: "application/json; charset=utf-8",
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
    "age": 35
}

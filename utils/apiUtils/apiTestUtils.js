import {request} from "@playwright/test";

export async function createNewContext() {
    return await request.newContext();
}

export function getResponseStatus(response) {
    return response.status()
}

const headersArray = (response) => {
    return response
        .headersArray();
}

export function getContentTypeHeaderValue(response) {
    return headersArray(response)
        .find((header) => header.name === 'Content-Type')
        .value;
}

export async function getResponseBody(response) {
    return await response.json();
}

export function getContentLengthHeaderValue(response) {
    return headersArray(response)
        .find((header) => header.name === 'Content-Length')
        .value;
}

export async function getResponseText(response) {
    return await response.text();
}
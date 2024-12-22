import * as testData from "../testData/apiTestData/apiTestData";

export async function setPrecondition_DeleteUsers_CreateUser(request) {
    await request.delete(`${testData.USERS_ENDPOINT}/`)

    await request.post(
        `${testData.USERS_ENDPOINT}/`,
        {data: testData.user,
        })
}

export async function setPrecondition_DeleteUsers(request) {
    await request.delete(`${testData.USERS_ENDPOINT}/`);
}

export async function setPrecondition_DeleteUsers_CreateUsers(request) {
    await request.delete(`${testData.USERS_ENDPOINT}/`);

    for (const user of testData.users) {
        await request.post(
            `${testData.USERS_ENDPOINT}/`,
            {data: user}
        )
    }
}
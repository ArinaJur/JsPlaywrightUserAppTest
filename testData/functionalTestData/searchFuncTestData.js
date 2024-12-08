import { users } from "./usersTestData.js";

export const data = {
    _1: {
        tcName: "Unique First Name",
        searchCriteria: ['', users.user1.firstName, '', ''],
        expectedCount: 1,
        expectedUsers: [users.user1],
    },
    _2: {
        tcName: "Unique Last Name",
        searchCriteria: ['', '', users.user4.lastName, ''],
        expectedCount: 1,
        expectedUsers: [users.user4],
    },
    _3: {
        tcName: "Unique Age",
        searchCriteria: ['', '', '', users.user3.age],
        expectedCount: 1,
        expectedUsers: [users.user3],
    },
    _4: {
        tcName: "Non-Unique First Name",
        searchCriteria: ['', users.user2.firstName, '', ''],
        expectedCount: 2,
        expectedUsers: [users.user2, users.user4],
    },
    _5: {
        tcName: "Non-Unique Last Name",
        searchCriteria: ['', '', users.user3.lastName, ''],
        expectedCount: 3,
        expectedUsers: [users.user1, users.user2, users.user3],
    },
    _6: {
        tcName: "Non-Unique Age",
        searchCriteria: ['', '', '', users.user4.age],
        expectedCount: 2,
        expectedUsers: [users.user4, users.user1],
    },
}
//
// "Unique First Name" - 1,  firstName === search criteria
// "Unique Last Name" - 1,  lastName === search criteria
// "Unique Age" - 1,  age === search criteria
//
// "Non-Unique First Name" - 2,  firstName === search criteria
// "Non-Unique Last Name" - 3,  lastName === search criteria
// "Non-Unique Age" - 2,  age === search criteria
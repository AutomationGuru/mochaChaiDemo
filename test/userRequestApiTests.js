import 'babel-polyfill';
import chai from 'chai';
import https from 'https';
import fetch from 'node-fetch';
import { userSchema, userCreated, userUpdated, mockApiUrl, appendUsersReq, appendUsersPage, appendUsersNotFound, validateJson } from '../util/userApiUtil';
import { existAndNumberAssert, assertEachDataBlock, assert } from '../util/assertUtil';

/*
This test Suite covers various different test that assert:
    * Get
    * Post
    * Put
    * Delete
    * Get(Delayed response)
     MOCHA:
        Describe, it, before, after, timeout, skip
*/

/*
*   
*      1. GET ASSERTIONS
*        Given i need to retrive a set of user
*        when i query https://reqres.in/api/users
*        then i must see that the response is 200
*        and the json response has valid attributes
*        and on subsequent requests to different page i must see a valid json
*
*/
// The test suite uses a call back to assert the response
describe(`Verify Api call ${mockApiUrl}${appendUsersReq} using callback - done`, () => {
    it('should always be 200', (done) => {
        https.get(mockApiUrl + appendUsersReq, (response) => {
            assert.equal(200, response.statusCode, mockApiUrl + appendUsersReq);
            done()
        })
    })
})

/* The test suite asserts the API call to https://reqres.in/api/users
    Based on the response
    The test assert the json response parsing each page of the requests
    https://reqres.in/api/users?page=[1-3]
*/
describe(`Verify Api call ${mockApiUrl}${appendUsersReq} with Async/Await`, () => {
    let response;
    let json;
    // Run once before all tests
    before(async () => {
        response = await fetch(mockApiUrl + appendUsersReq);
        json = await response.json();
    });

    it('response should always be 200', () => {
        assert.equal(200, response.status);
        const totalPageToParse = json.total_pages;
        for (let i = 0; i < totalPageToParse; i++) {
            describe('verify the json response', () => {
                before(async () => {
                    response = await fetch(mockApiUrl + appendUsersPage + (i + 1));
                    json = await response.json();
                })
                it('The response body must contain Page, total page and data', () => {
                    existAndNumberAssert(json.page)
                    existAndNumberAssert(json.total_pages)
                    existAndNumberAssert(json.per_page)
                    assert.exists(json.data)
                })
                it(`data block in each page must have ${json.per_page} `, () => {
                    assert.equal(json.per_page, json.data.length);
                    for (let z = 0; z < json.data.length; z++) {
                        assertEachDataBlock(json.data[z]);
                    }
                })
                it(`Each data block must have id, name`, () => {
                    for (let z = 0; z < json.data.length; z++) {
                        assertEachDataBlock(json.data[z]);
                    }
                })
            })

        }
    })
}).timeout(300);

/*
Doing the same as above but not parsing the json but comapring the json schema 
*/

describe(`Verify Api call agin ${mockApiUrl}${appendUsersReq}`, () => {
    let response;
    let json;
    // Run once before all tests
    before(async () => {
        response = await fetch(mockApiUrl + 'api/users');
        json = await response.json();
    });

    it('response should always be 200', () => {
        assert.equal(200, response.status);
        const totalPageToParse = json.total_pages;
        for (let i = 0; i < totalPageToParse; i++) {
            describe('verify the json response by comapring with saved Json schemas ', () => {
                before(async () => {
                    response = await fetch(mockApiUrl + appendUsersPage + (i + 1));
                    json = await response.json();
                })
                it('Jason structure/data verified', () => {
                    assert.isTrue(validateJson.validate(json, userSchema).errors.length == 0, validateJson.validate(json, userSchema).errors)
                })
            })

        }
    })
})

/*
    get with a response 404
*/
describe('Get a unknown user', () => {
    it('Verify that the response is 404', async () => {
        let response = await fetch(appendUsersNotFound);
        assert.equal(404, response.status);
    })

})

/*
*   
*      2. POST/PUT ASSERTIONS
*        Given i need to create a set of user
*        when i post https://reqres.in/api/users
*        then i must see that the response is 201
*        and the json response has user created
*        and on subsequent update has a valid 200 response
*
*/
describe('Create a new user using POST', () => {
    let newUser = {
        "name": "morpheus",
        "job": "leader"
    }
    let response;
    let json;
    it('Posting a new user and the response must be 201', async () => {
        response = await fetch(mockApiUrl + appendUsersReq, { method: 'POST', body: `${newUser}` })
        json = await response.json();
        assert.equal(201, response.status);
    })
    it('Verify the response json after POST', () => {
        assert.isTrue(validateJson.validate(json, userCreated).errors.length == 0, validateJson.validate(json, userCreated).errors)
    })
    it('Update the User created using PUT', async () => {
        let newUserUpdate = {
            "name": "morpheus",
            "job": "leader Of Zeus"
        }
        response = await fetch(mockApiUrl + appendUsersReq, { method: 'PUT', body: `${newUser}` })
        json = await response.json();
        assert.equal(200, response.status);
    })
    it('Verify the response after a PUT', () => {
        assert.isTrue(validateJson.validate(json, userUpdated).errors.length == 0, validateJson.validate(json, userUpdated).errors)
    })
})

/*
*   
*      3. DELETE ASSERTIONS
*        Given i need to Delete a  user
*        when i DELETE https://reqres.in/api/users
*        then i must see that the response is 204
*
*/
describe('Delete the existing user', () => {
    it('post a delete request and it must be 204', async () => {
        let response = await fetch(mockApiUrl + appendUsersReq + '/2', { method: 'DELETE' });
        assert.equal(204, response.status);
    })
})


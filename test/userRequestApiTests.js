import 'babel-polyfill';
import chai from 'chai';
import https from 'https';
import fetch from 'node-fetch';
import { userSchema, mockApiUrl, appendUsersReq, appendUsersPage, validateJson } from '../utils/userApiUtil';
import { existAndNumberAssert, assertEachDataBlock, assert } from '../utils/assertUtil';

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
        response = await fetch(mockApiUrl + 'api/users');
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
})

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



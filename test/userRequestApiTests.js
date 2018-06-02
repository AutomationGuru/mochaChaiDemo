import 'babel-polyfill';
import chai from 'chai';
import https from 'https';
import fetch from 'node-fetch';
import {validator,Validator} from 'jsonschema';
import {userSchema,mockApiUrl,appendUsersReq} from '../Utils/userApiUtils';
import {existAndNumberAssert,assertEachDataBlock,assert} from '../Utils/assertUtil';

let v = new Validator();
v.addSchema(userSchema, '/SimpleUser');

describe('Verify Api call using callback done',()=>{
    it('should always be 200',(done)=>{
        https.get(mockApiUrl+appendUsersReq,(response)=>{
            assert.equal(200,response.statusCode,mockApiUrl+appendUsersReq);     
            done()
        })     
    })
})  

describe('Verify User Api call with Async/Await',()=>{
    let response;
    let json;

    before(async ()=>{
        response = await fetch(mockApiUrl+'api/users');
        json = await response.json();   
    });


    it('should always be 200', () => {
        assert.equal(200,response.status); 
        const totalPageToParse=json.total_pages;
        for(let i=0; i < totalPageToParse;i++){
            describe('verify the json response', ()=>{
                before(async ()=>{
                    response = await fetch(mockApiUrl+'api/users?page='+(i+1));
                    json = await response.json(); 
                })
                it('The response body must contain Page, total page and data',()=>{
                    existAndNumberAssert(json.page)
                    existAndNumberAssert(json.total_pages)
                    existAndNumberAssert(json.per_page)
                    assert.exists(json.data)
                })           
                it('data in each page must have `json.per_page` ', ()=>{
                    assert.equal(json.per_page, json.data.length);
                    for(let z=0; z < json.data.length;z++){                          
                        assertEachDataBlock(json.data[z]);                                    
                    }
                })
                it('Jason structure is',()=>{
                    assert.isTrue(v.validate(json, userSchema).errors.length == 0 ,v.validate(json, userSchema).errors)    
                })  
            })
                         
        }    
    })    
})




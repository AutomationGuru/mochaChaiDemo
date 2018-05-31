import 'babel-polyfill';
import chai from 'chai';
import https from 'https';
import fetch from 'node-fetch';
const expect = chai.expect

let assert= chai.assert;    
const mockApiUrl='https://reqres.in/';  

const existAndNumberAssert = (element) => {
    assert.exists(element);
    assert.isNumber(element); 
}

const assertEachDataBlock = (dataElement) => {
    assert.exists(dataElement.id);
    console.log(dataElement.id)
    assert.isNumber(dataElement.id)
    assert.exists(dataElement.first_name);
    assert.isString(dataElement.first_name)
    assert.exists(dataElement.last_name); 
    assert.isString(dataElement.last_name)
    assert.exists(dataElement.avatar);
    assert.isString(dataElement.avatar);
}

describe('Verify Api call using callback done',()=>{
    it('should always be 200',(done)=>{
        https.get(mockApiUrl+'api/users',(response)=>{
            assert.equal(200,response.statusCode);     
            done()
        })     
    })
})  

describe('Verify User Api call with Async/Await',()=>{
    it('should always be 200', async () => {
        let response = await fetch(mockApiUrl+'api/users');
        let json = await response.json();        
        assert.equal(200,response.status); 
        describe('verify the json response',()=>{
            it('The response body must contain Page, total page and data',()=>{
                existAndNumberAssert(json.page)
                existAndNumberAssert(json.total_pages)
                existAndNumberAssert(json.per_page)
                assert.exists(json.data)
            })
            for(let i=0; i < json.total_pages;i++){
                it('data in each page must have `json.per_page` ', async ()=>{
                    assert.equal(json.per_page, json.data.length);
                    response = await fetch(mockApiUrl+'api/users?page='+(i+1))
                    json = await response.json(); 
                    console.log(json.data.length);                     
                    for(let z=0; z < json.data.length;z++){                        
                        describe('verifying each data block', ()=>{
                            it('The data block must contain, id, first name, last name and textlink', () => {                            
                                assertEachDataBlock(json.data[z]);
                                // it('the text link for the image must be valid',()=>{
    
                                // })
                            })    
                        })
                    }
                })                
            }
        }) 
        
    })
})




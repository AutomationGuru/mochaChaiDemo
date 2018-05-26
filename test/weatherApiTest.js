import 'babel-polyfill';
import chai from 'chai';
import http from 'http';
import fetch from 'node-fetch';
const expect = chai.expect

let assert= chai.assert;    
let array1 =['1','2'];

describe('length of the array verify',()=>{
    it('should always be 2',()=>{
        assert.equal(array1.length,2);
    })
})

describe('Verify Api call',()=>{
    it('should always be 200',(done)=>{
        http.get('http://samples.openweathermap.org/data/2.5/forecast?q=London,GB',(response)=>{
            assert.equal(response.statusCode,200);     
            done()
        })     
    })
})  

describe('Verify Api call with Async',()=>{
    it('should always be 200', async () => {
        const response = await fetch('http://samples.openweathermap.org/data/2.5/forecast?q=London,GB');
        const json = await response.json();
        console.log(response.json());
        assert.equal(response.statusCode,200);     
    })
})




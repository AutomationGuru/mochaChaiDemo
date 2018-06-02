import chai from 'chai';
const expect = chai.expect
export let assert= chai.assert;    

export let existAndNumberAssert = (element) => {
    assert.exists(element);
    assert.isNumber(element); 
}

export let assertEachDataBlock = async (dataElement) => {
    assert.exists(dataElement.id);
    assert.isNumber(dataElement.id)
    assert.exists(dataElement.first_name);
    assert.isString(dataElement.first_name)
    assert.exists(dataElement.last_name); 
    assert.isString(dataElement.last_name)
    assert.exists(dataElement.avatar);
    assert.isString(dataElement.avatar);  
    const response = await fetch(dataElement.avatar);
    assert.equal(200,response.status); 
}

export const mockApiUrl='https://reqres.in/';  
export const appendUsersReq='api/users';


export const userSchema = {
    "id": "/SimpleUser",
    "type": "object",
    "properties": {
        "page": {"type": "integer", "minimum": 1},
        "per_page": {"type": "integer", "minimum": 1},
        "total": {"type": "integer", "minimum": 1},
        "total_pages": {"type": "integer", "minimum": 1},
        "data":{
            "type": "array",
            "minItems": 1,
            "maxItems": 3,
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type":"integer"},    
                    "first_name": {"type":"string"},
                    "last_name": {"type":"string"},
                    "avatar": {"type":"string", "pattern": "^https"}
                }
            }
        }            
    },
    "required": ["page", "per_page","total","total_pages","data"]
  };

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

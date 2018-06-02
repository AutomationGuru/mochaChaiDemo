import {validator,Validator} from 'jsonschema';

export const mockApiUrl='https://reqres.in/';  
export const appendUsersReq='api/users';
export const appendUsersPage=appendUsersReq+'?page=';

export let validateJson = new Validator();
validateJson.addSchema(userSchema, '/SimpleUser');

// Json schema with rules can be added to assert it by approval tests   
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
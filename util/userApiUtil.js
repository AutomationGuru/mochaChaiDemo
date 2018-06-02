import { validator, Validator } from 'jsonschema';

export const mockApiUrl = 'https://reqres.in/';
export const appendUsersReq = 'api/users';
export const appendUsersNotFound = mockApiUrl + 'api/unknown/23';
export const appendUsersPage = appendUsersReq + '?page=';

export let validateJson = new Validator();
validateJson.addSchema(userSchema, '/SimpleUser');
validateJson.addSchema(userCreated, '/SimpleUserCreated');
validateJson.addSchema(userUpdated, '/SimpleUserUpdated');

// Json schema with rules can be added to assert it by approval tests   
export const userSchema = {
    "id": "/SimpleUser",
    "type": "object",
    "properties": {
        "page": { "type": "integer", "minimum": 1 },
        "per_page": { "type": "integer", "minimum": 1 },
        "total": { "type": "integer", "minimum": 1 },
        "total_pages": { "type": "integer", "minimum": 1 },
        "data": {
            "type": "array",
            "minItems": 1,
            "maxItems": 3,
            "items": {
                "type": "object",
                "properties": {
                    "id": { "type": "integer" },
                    "first_name": { "type": "string" },
                    "last_name": { "type": "string" },
                    "avatar": { "type": "string", "pattern": "^https" }
                }
            }
        }
    },
    "required": ["page", "per_page", "total", "total_pages", "data"]
};

export const userCreated = {
    "id": "/SimpleUserCreated",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "job": { "type": "string" },
        "id": { "type": "string" },
        "createdAt": { "type": "string" }
    },
    "required": ["id", "createdAt"]
};

export const userUpdated = {
    "id": "/SimpleUserUpdated",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "job": { "type": "string" },
        "updatedAt": { "type": "string" }
    },
    "required": ["updatedAt"]
};
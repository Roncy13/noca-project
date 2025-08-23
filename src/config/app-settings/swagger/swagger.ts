export default {
  "swagger": "2.0",
  "info": {
    "title": "Smurf API",
    "description": "Smurf API Information",
    "contact": {
      "name": "Amazing Developer"
    }
  },
  "host": "localhost:4000",
  "basePath": "",
  "tags": [
    {
      "name": "Users",
      "Description": "Api for fetch users"
    }
  ],
  "schemes": ["http", "https"],
  "consumes": ["application/json"],
  "produces": ["application/json "],
  "paths": {
    "/user": {
      "get": {
        "tags": ["Users"],
        "summary": "Get all users",
        "respose": {
          "200": {
            "discription": "OK"
          }
        }
      }
    },
  },
  "definitions": {
    "accessToken": {
      "type": "string"
    },
    "message": {
      "type": "string"
    },
    "statusCode": {
      "type": "number"
    },
    "id": {
      "properties": {
        "uuid": {
          "type": "string"
        }
      }
    },
    "SigIn": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    }
  }
}
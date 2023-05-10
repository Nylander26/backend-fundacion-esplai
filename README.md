[![CodeFactor](https://www.codefactor.io/repository/github/nylander26/backend-fundacion-esplai/badge)](https://www.codefactor.io/repository/github/nylander26/backend-fundacion-esplai)

# Login & Register Server

Login & Register Server is a Express.js app that manages the register and the login process, it's part of the Fundacion Esplai Hackaton preselection process for the final work.

# Installation and Usage

Use the package manager [npm](https://www.npmjs.com/) to install Login & Register Server.

```javascript
1. npm install // (It will install the dependencies needed.)
2. npm start // (It will run the server.)
```

# API/Endpoint
### GET "/"
Shows the welcome route.
```javascript
GET `http://localhost:3001/`
```
### POST /api/register
Route that manages the logic for saving the user, it will ask for `name, lastname, email, password` in the request body in JSON format. Use either ThunderClient or Postman or whichever software you like.
```javascript
POST `http://localhost:3001/api/register`

RESPONSE ---> ("REGISTER SUCCESSFULL")
```
### POST /api/login
Route that manages the logic for login the user, it will ask for `email, password` in the request body in JSON format. Use either ThunderClient or Postman or whichever software you like, the response is a signed `token` for authenticate the user.
```javascript
POST `http://localhost:3001/api/login`

RESPONSE ---> {"accessToken" : ".........."}
```

### GET /api/home
Route that manages the logic for show the user information, it will ask for the `token` in the request body in JSON format. Use either ThunderClient or Postman or whichever software you like.
```javascript
GET `http://localhost:3001/api/home`

RESPONSE ---> {
"name" : "....", 
"lastname" : "....", 
"...." : "...."
}
```
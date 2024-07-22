# Title : api_lbdc

Server for the application LabibliothequeDeCyril 


## Installation

Follow all the steps to install the project


### Versions of stacks

- Node.js (version 20.11.0 or higher)
- npm (version 10.5.0 ou supérieure)
- Psql


### Steps

1. Clone the project :
   ```sh
   git clone https://github.com/cpoiny/api_lbdc.git

2. cd api_lbdc

3. Install dependencies
    Run `npm install -D typescript @types/express ts-node nodemon @types/cors @types/node`
    Run `npm install --save-dev @types/bcrypt`
    Run `npm install --save-dev @types/jwt`
    Run `npm install --save-dev @types/joi`

4. Set the environnement variables with the correct data: 
    PORT=
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    JWT_SECRET=


### Run the server

Run `npm start`
Thanks to nodemon, the api will recompile automatically to each changes in a file.

### Features

- Feature 1: Authentication with a session token;
- Feature 2 : CRUD on the entity "Post", "Author" and "Media";
- Feature 3 : Middleware to check the token are implemented on the api to allow the request to be executed.

# Project Title

Race simulator

---
## Requirements

For development, you will need Node.js (version 12 or later) and a node global package, Yarn, installed in your environement.
You will also need running MongoDb server.

## Install

    $ git clone this repository
    $ cd raceSimulator
    $ yarn install

## Configure 

Make sure you have below environment variables. 

- MONGO_URI ( MongoDB URL including host, port, database name and password if any. eg "mongodb://localhost:27017/raceSimulator")
- API_BASE_URL (Server URL to fetch data)
- LOGIN_EMAIL (Email Id to login on server)
- LOGIN_PASSWORD (Password to login on server)

## Running the project

    $ yarn start

## Testing the project

    $ yarn test
    $ use stc/test folder to add more tests

## Using docker 

    $ replace localhost to mongo for MONGO_URI variable in .env file
    $ make sure docker is installed
    $ run docker-compose up

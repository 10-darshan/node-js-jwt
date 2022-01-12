[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Project Name

> Techwondoe

## Prerequisites

This project requires NodeJS and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install. NPM is by default included in the newer versions of NODE.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
7.3.0
v12.22.7
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setting environment variables](#setting-environment-variables)
  - [Serving the app](#serving-the-app)
  - [Usage](#usage)
  - [Authors](#authors)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git https://github.com/10-darshan/node-js-jwt.git
$ cd node-js-jwt
```

To install and set up the library, run:

```sh
$ npm install
```

## Setting environment variables

Create a .env file in the current directory with the following contents:

```sh
$ vim .env
SECRET_KEY= // Secret key for jwt token. Should be a string atleast 32 characters in length.
MONGO_USERNAME=  // Mongodb username. Will be send via mail.
MONGO_PASSWORD= // Mongodb password. Will be send via mail.
PORT=9000  // (Optional) Port on which node js server will run. Sever will run on port 9000 by default if no port provided.
```

## Serving the app

```sh
$ npm start
```

## Usage

Choose any REST API client (eg. POSTMAN) and perforn the below functions -  

- Register youself into the application:

```
POST http://localhost:9000/register
content-type: application/json

{
    "username": "your_username",
    "password": "Your_password"
}
```
- Login into the application using your username and password:

```
POST http://localhost:9000/login
content-type: application/json

{
    "username": "your_username",
    "password": "Your_password"
}
```
*Note:* A token will be generated for your user which will be valid for only 10 minutes. For any subsequent operations using your current user you will require this token. So make sure to copy it somewhere. Once the token expires after 10 minutes you can login again with your user to generate a new token for you.

- Create a company:

```
POST http://localhost:9000/company
Authorization: Bearer {token}
content-type: application/json

{
    "UUID":"company_uuid",           // Unique, String, Required
    "name":"company_name",           // String, Required
    "CEO":"company_ceo_name",        // String, Required
    "address": {                     // Object, Required
        "district":"district_name",
        "state":"state_name",
        "country":"country_name",
        "pinCode":pincode
    },
    "inceptionDate":"2011-10-10"     // Date('YYYY-MM-DD'), Required
}
```
*Note* Make sure to pass the token in place of {token}.


- Create a team in a company:

```
POST http://localhost:9000/team/{company._id}
Authorization: Bearer {token}
content-type: application/json

{
    "UUID":"team_uuid",
    "leadName":"team_name"
}
```
*Note* Make sure to pass the token in place of {token}.  
*Note* Make sure to pass company's _id value in {company._id} to make the team part of the intended company.


- Get company by id:

```
GET http://localhost:9000/company/{company._id}
Authorization: Bearer {token}
```
*Note* Make sure to pass the token in place of {token}.  
*Note* Make sure to pass company's _id value in {company._id} to search the company by id.


- Get company by name:

```
GET http://localhost:9000/company?name={company.name}
Authorization: Bearer {token}
```
*Note* Make sure to pass the token in place of {token}.  
*Note* Make sure to pass company's name in {company.name} to search the company by name.


- Get all teams grouped within company object:

```
GET http://localhost:9000/company/team
Authorization: Bearer {token}
```
*Note* Make sure to pass the token in place of {token}.  


## Authors

* **Darshan Singh** - *Initial work* - [10-darshan](https://github.com/10-darshan)


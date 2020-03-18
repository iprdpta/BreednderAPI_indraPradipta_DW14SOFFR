# PetMatch API

### Installation

First, clone this repository into your system.

```
git clone https://github.com/iprdpta/BreednderAPI_indraPradipta_DW14SOFFR.git
```

Then, install all the packages that described in `package.json` of both `client` and `server` directories.

```
npm install
```

### Server Setup

For the server setup, first, make sure your MySQL services is running fine. In `server` directory, you'll find `config.json` inside `config` folder. Open and edit the `development` configuration to match your database setup.

```
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
```

After completing the database configuration setup, migrate all the required tables.

```
npm run build
```

We also need to configure some environtment variables for the server, let's create .env file in server's root project, open and edit it, then input the code below.

```
PORT=4000
SECRET_KEY=ThisIsTheSecretKey
```

The `SECRET_KEY` and `PORT` you can custom it as you wish.

And for the last step, running the server

```
npm start
```

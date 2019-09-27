# UTCAA backend

The backend project of UTCAA website

## Set up steps:

1, Set up node.js and npm

2, checkout the code

3, run `npm i`

4, copy `./config/config.dev.js` to `./config/config.js`

5, setup mysql database server and use 3306 as the port, and also:

5.1, create a schema called `utcaa` with charset and default collation selected to `utf8mb4`

5.2, create a user and password from the right config file, and give this user the `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`, `CREATE`, `ALTER`, `REFERENCES`, `INDEX`, `DROP`, `TRIGGER` privileges to `utcaa`

6, run `npm run db:config` to configure the db connection

7, run `npm run db:migrate` to perform db migration

8, create \logs folder under the app's root folder

9, to run tests, use one of the following:

9.1, `npm run test`

9.2, `npm run test:integration`

9.3, `npm run test:unit`

10, to start the server, run: `npm run start`

## Coding standard:

1, All file names are lower cases

2, All const, let and var are lower camel case (lowerCase)

3, All db table and field names are sneak cases, plural (my_tables)

4, All entities are lower camel case, singular (user, userAction)

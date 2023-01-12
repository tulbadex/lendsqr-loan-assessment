require('dotenv').config();
const knex = require('knex')({
    debug: true,
    client: 'mysql',
    connection: {
        // host : '127.0.0.1',
        host : process.env.DATABASE_HOST,
        port : process.env.DATABASE_PORT,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME
    }
});

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;
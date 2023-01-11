const knex = require('knex')({
    debug: true,
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : '',
        database : 'lendsqr_test'
    }
});

module.exports = knex
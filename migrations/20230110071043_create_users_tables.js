/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function(table){
            table.increments('id').primary();
            table.string('firstname', 50).notNullable();
            table.string('lastname', 50).notNullable();
            table.string('username', 100).notNullable().unique();
            table.string('email', 150).notNullable().unique();
            table.string('password', 150).notNullable();
            table.string('token', 150).notNullable().unique();
            table.timestamps();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};

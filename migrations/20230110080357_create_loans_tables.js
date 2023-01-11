/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('loans', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
            table.integer('amount').notNullable().defaultTo(0);
            table.integer('payment').notNullable().defaultTo(0);
            table.timestamps();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('wallets', (table) => {
            table.increments('id').primary();
            table.string('wallet_no').notNullable()
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
            table.integer('balance').notNullable().defaultTo(0);
            table.timestamps();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('transactions', (table) => {
            table.increments('id').primary();
            table.integer('sender_id').unsigned().notNullable();
            table.foreign('sender_id').references('users.id').onDelete('CASCADE');
            table.integer('recipient_id').unsigned().nullable();
            table.foreign('recipient_id').references('users.id').onDelete('CASCADE');
            table.decimal('amount').notNullable();
            table.string('type', 20).nullable();
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('transactions')
};

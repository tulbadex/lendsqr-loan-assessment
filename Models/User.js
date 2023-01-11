const bookshelf = require('../Connection/Connection');
const  { Wallet } = require('./Wallet');
const  { Transaction } = require('./Transaction');
const moment = require('moment');

class User extends bookshelf.Model {
    get tableName() { return 'users' }

    wallet() {
        return this.hasOne(Wallet, 'user_id')
    }

    sentTransactions() {
        return this.hasMany(Transaction, 'sender_id');
    }

    receivedTransactions() {
        return this.hasMany(Transaction, 'recipient_id');
    }

    static async checkUserToken(token) {
        /* return this.query(function(qb) {
            qb.where({token: token}).andWhere('token', 'is not', null);
        }).fetch({require: false}); */
        return this.forge().where({token: token}).fetch({require: false});
    }

    static async recipeint(email) {
        return this.forge().where({email: email}).fetch({require: false});
    }

    // 7805746d-e4db-415e-ba71-ec32e6d3b30b
}

/* const User = bookshelf.model('User', {
    tableName: 'users',
    wallet() {
        return this.hasOne(Wallet, 'user_id');
    },

    sentTransactions() {
        return this.hasMany(Transaction, 'sender_id');
    },

    receivedTransactions() {
        return this.hasMany(Transaction, 'recipient_id');
    }
}); */

module.exports = {User};
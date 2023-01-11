const bookshelf = require('../Connection/Connection');
const  { User } = require('./User');
const moment = require('moment');

class Wallet extends bookshelf.Model {
    get tableName() { return 'wallets'; }

    user() {
        return this.belongsTo(User, 'user_id')
    }

    static async updateWallet(balance, user_id, mode) {
        const wallet = await this.forge().where({user_id: user_id}).fetch({required: false});
        const current_balance = wallet.toJSON();
        const new_balance = (mode === 'credit') ? current_balance.balance + balance : current_balance.balance - balance
        wallet.set('balance', new_balance)
        wallet.set('updated_at', moment().format('YYYY-MM-DD HH:mm:ss'))
        return wallet.save()
    }

    static async getBalance(user_id) {
        const wallet = await this.forge().where({user_id: user_id}).fetch({required: false});
        const walletJson = wallet.toJSON();
        return walletJson.balance
    }
}

module.exports = {Wallet};
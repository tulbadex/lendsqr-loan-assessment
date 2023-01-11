const bookshelf = require('../Connection/Connection');
const  { User } = require('./User');

class Transaction extends bookshelf.Model {
    get tableName() { return 'transactions'; }

    sender() { 
        return this.belongsTo(User, 'sender_id');
    }

    recipient() { 
        return this.belongsTo(User, 'recipient_id');
    }
}

module.exports = {Transaction};
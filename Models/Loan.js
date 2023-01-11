const bookshelf = require('../Connection/Connection');
const { User } = require('./User');

class Loan extends bookshelf.Model {
    get tableName() { return 'loans'; }

    user() {
        return this.belongsTo(User, 'user_id')
    }
}

module.exports = {Loan};
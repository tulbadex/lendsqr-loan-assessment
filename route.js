const router = require('express').Router();
const { createAccount } = require('./Controllers/User');
const { fundAccount, transferToAccount, withdrawFunds } = require('./Controllers/Transaction');

router.post('/create_account', createAccount)
router.post('/fund_account', fundAccount)
router.post('/transfer_fund', transferToAccount)
router.post('/withdraw_fund', withdrawFunds)

module.exports = router;
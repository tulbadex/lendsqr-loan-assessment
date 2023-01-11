const uuid  = require('uuid');
const { User } = require('../Models/User');
const { Wallet } = require('../Models/Wallet');
const { Transaction } = require('../Models/Transaction');
const moment = require('moment')
const uniqid = require('uniqid');

async function fundAccount(req, res) {
    const token = req.body.token
    const checkToken = await User.checkUserToken(token)
    if (!checkToken) return res.json(422, {success: false, message:"Invalid token"})

    const data = {
        sender_id: checkToken.id,
        amount: req.body.amount,
        type: 'deposit',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const transaction = await new Transaction(data).save()
    const wallet = await Wallet.updateWallet(data.amount, data.sender_id, "credit")

    if (transaction && wallet) {
        return res.json(
            201, 
            {success: true, message: `Your Account has been successfully updated with ${data.amount} fund`}
        )
    }
    return res.json(
        401, 
        {success: false, message: `Error occur while funding your account`}
    )
    
}

async function transferToAccount(req, res) {
    const token = req.body.token
    const email = req.body.recipeint_email
    const amount = req.body.amount
    const checkToken = await User.checkUserToken(token)
    if (!checkToken) return res.json(422, {success: false, message:"Invalid token"})

    const recipient = await User.recipeint(email)

    if (!recipient) return res.json(422, {success: false, message:"Invalid recipient email"})

    const sender_balance = await Wallet.getBalance(checkToken.id)

    // check if amount to transfer to receipient account is available
    if(sender_balance < amount) return res.json(422, {success: false, message:"You do not have enough funds"})
    
    // credit the receipient account
    const update_receipient_balance = Wallet.updateWallet(amount, recipient.id, "credit")

    // deduct from sender account
    const update_sender_balance = Wallet.updateWallet(amount, checkToken.id, "dedit")

    // record transaction history
    const data = {
        sender_id: checkToken.id,
        recipient_id: recipient.id,
        amount: amount,
        type: 'transfer',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const transaction = await new Transaction(data).save()

    if (transaction && update_receipient_balance && update_sender_balance) {
        return res.json(
            201, 
            {success: true, message: `Your transfer to ${email} was successful with ${amount}`}
        )
    }
    return res.json(
        401, 
        {success: false, message: `Error occur while transfering funds`}
    )
    
}

async function withdrawFunds(req, res) {
    const token = req.body.token
    const amount = req.body.amount

    const checkToken = await User.checkUserToken(token)
    if (!checkToken) return res.json(422, {success: false, message:"Invalid token"})

    const balance = await Wallet.getBalance(checkToken.id)

    // check if amount to withdraw from account is available
    if(balance < amount) return res.json(422, {success: false, message:"You do not have enough funds"})

    // deduct from user account
    const update_user_balance = Wallet.updateWallet(amount, checkToken.id, "withdraw")

    const data = {
        sender_id: checkToken.id,
        amount: req.body.amount,
        type: 'withdraw',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const transaction = await new Transaction(data).save()

    if (transaction && update_user_balance) {
        return res.json(
            201, 
            {success: true, message: `You have successfully withdrawn ${amount} funds`}
        )
    }
    return res.json(
        401, 
        {success: false, message: `Error occur while withdrawing funds`}
    )

}

module.exports = {
    fundAccount,
    transferToAccount,
    withdrawFunds
};
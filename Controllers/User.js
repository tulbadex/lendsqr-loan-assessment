const uuid  = require('uuid');
const { User } = require('../Models/User');
const { Wallet } = require('../Models/Wallet');
const bcrypt = require("bcrypt")
const moment = require('moment')
const uniqid = require('uniqid');

async function createAccount(req, res) {
    const token = uuid.v4();
    await checkEmailExists(req, res);
    await checkUsernameExists(req, res);

    const password = await bcrypt.hash(req.body.password, 10)
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: password,
        token: token,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const user = await new User(data).save();
    await new Wallet({
        user_id: user.id, wallet_no: uniqid(), balance: 0, 
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }).save();
    // if(user) user.wallets().create({wallet_no: uniqid(), balance: 0, created_at: moment().format('YYYY-MM-DD')})
    return res.status(201).send({success: true, token: token});
}

function checkEmailExists(req, res, next) {

    const checkEmail = User.where({email: req.body.email}).fetch()
    checkEmail.then(c=> {
        if(c) return res.json(422, {success: false, error: 'Email already exists'})
    }).catch(err => {
        console.error(err)
    });
}

function checkUsernameExists(req, res, next) {
    const checkUsername = User.where({username: req.body.username}).fetch()
    checkUsername.then(c=> {
        if(c) return res.json(422, {success: false, error: 'Username already exists'})
    }).catch(err => {
        console.error(err)
    });
}

module.exports = {createAccount};
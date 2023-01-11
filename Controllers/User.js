const uuid  = require('uuid');
const { User } = require('../Models/User');
const { Wallet } = require('../Models/Wallet');
const bcrypt = require("bcrypt")
const moment = require('moment')
const uniqid = require('uniqid');

async function createAccount(req, res) {
    const token = uuid.v4();
    // await checkEmailExists(req, res);
    const check_email = await User.checkEmail(req.body.email)
    if(check_email) return res.json(422, {success: false, message:"Email already exists"})

    const check_username = await User.checkUsername(req.body.username)
    if(check_username) return res.json(422, {success: false, message:"Username already exists"})
    
    // await checkUsernameExists(req, res);

    const password = await bcrypt.hash(req.body.password, 10)
    // const result = await bcrypt.compare(plaintextPassword, hash);
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
        console.log(err)
    });
}

function checkUsernameExists(req, res, next) {
    const checkUsername = User.where({username: req.body.username}).fetch()
    checkUsername.then(c=> {
        if(c) return res.json(422, {success: false, error: 'Username already exists'})
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {createAccount};
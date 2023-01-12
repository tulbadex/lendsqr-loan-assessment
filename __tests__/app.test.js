const request = require('supertest')
const app = require('../index')
const bookshelf = require('../Connection/Connection');

describe('app', () => {
    beforeAll(async () => {
        await bookshelf.transaction(async (trx) => {
            await trx.migrate.latest()
        })
        // await knex.migrate.latest();
    });

    beforeEach(async () => {
        await bookshelf.transaction(async (trx) => {
            await trx.migrate.latest()
        })
        // await knex.migrate.latest();
    });

    afterAll(async () => {
        await bookshelf.transaction(async (trx) => {
            await trx.migrate.rollback();
            await trx.destroy()
        })
        /* await knex.migrate.rollback();
        await knex.destroy(); */
    });

    afterEach(async () => {
        await bookshelf.transaction(async (trx) => {
            await trx.migrate.rollback();
            await trx.destroy()
        })
        /* await knex.migrate.rollback();
        await knex.destroy(); */
    });

    describe('Create user account', () => {
        it('should be able to create user', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);
            
            expect(res.status).toBe(201)
            expect(res._body.success).toBeTruthy()
            expect(res._body.token).toBeDefined()
        })
    })

    describe('Failed when email exists', () => {
        it('should fails when email already exist', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const another_data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe1',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const another_res = await request(app)
                .post('/api/create_account')
                .send(another_data);
            
            expect(another_res.status).toBe(422)
            expect(another_res._body.success).toBeFalsy()
            expect(another_res._body.token).toBeUndefined()
            expect(another_res._body.message).toBe('Email already exists')
        })
    })

    describe('Failed when username exists', () => {
        it('should fails when username already exist', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const another_data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe1@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const another_res = await request(app)
                .post('/api/create_account')
                .send(another_data);
            
            expect(another_res.status).toBe(422)
            expect(another_res._body.success).toBeFalsy()
            expect(another_res._body.token).toBeUndefined()
            expect(another_res._body.message).toBe('Username already exists')
        })
    })

    describe('Fund account', () => {
        it('should be able to fund account', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: res._body.token,
                amount: 4000
            };

            const account_res = await request(app)
                .post('/api/fund_account')
                .send(fund);
            
            expect(account_res.status).toBe(201)
            expect(account_res._body.success).toBeTruthy()
            expect(account_res._body.message).toBe(`Your Account has been successfully updated with ${fund.amount} fund`)
        })
    })

    describe('User without valid token can not fund account', () => {
        it('should not allow account to be funded if token not valid', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: '0988989',
                amount: 4000
            };

            const account_res = await request(app)
                .post('/api/fund_account')
                .send(fund);
            
            expect(account_res.status).toBe(422)
            expect(account_res._body.success).toBeFalsy()
            expect(account_res._body.message).toBe('Invalid token')
        })
    })

    describe('Transfer fund to another account', () => {
        it('should be able to transfer fund account', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: res._body.token,
                amount: 10000
            };

            await request(app)
                .post('/api/fund_account')
                .send(fund);

            const another_data = {
                firstname: 'Maxwell',
                lastname: 'Doe',
                username: 'maxwell',
                email: 'maxwell@yahoo.com',
                password: 'password'
            }

            await request(app)
                .post('/api/create_account')
                .send(another_data);
            
            const transfer_data = {
                token: res._body.token,
                recipeint_email: another_data.email,
                amount: 2000
            }

            const transfer_res = await request(app)
                .post('/api/transfer_fund')
                .send(transfer_data);
            
            expect(transfer_res.status).toBe(201)
            expect(transfer_res._body.success).toBeTruthy()
            expect(transfer_res._body.message).toBe(`Your transfer to ${another_data.email} was successful with ${transfer_data.amount}`)
        })
    })

    describe('Transfer fund to another account should fail if email does not exist', () => {
        it('should not be able to transfer fund due to non existence of email', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: res._body.token,
                amount: 10000
            };

            await request(app)
                .post('/api/fund_account')
                .send(fund);

            const another_data = {
                firstname: 'Maxwell',
                lastname: 'Doe',
                username: 'maxwell',
                email: 'maxwell@yahoo.com',
                password: 'password'
            }

            await request(app)
                .post('/api/create_account')
                .send(another_data);
            
            const transfer_data = {
                token: res._body.token,
                recipeint_email: 'johnike@gmail.com',
                amount: 2000
            }

            const transfer_res = await request(app)
                .post('/api/transfer_fund')
                .send(transfer_data);
            
            expect(transfer_res.status).toBe(422)
            expect(transfer_res._body.success).toBeFalsy()
            expect(transfer_res._body.message).toBe('Invalid recipient email')
        })
    })

    describe('Transfer fund to another account should fail if amount is not sufficient', () => {
        it('should not be able to transfer fund due to sufficient fund', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: res._body.token,
                amount: 10000
            };

            await request(app)
                .post('/api/fund_account')
                .send(fund);

            const another_data = {
                firstname: 'Maxwell',
                lastname: 'Doe',
                username: 'maxwell',
                email: 'maxwell@yahoo.com',
                password: 'password'
            }

            await request(app)
                .post('/api/create_account')
                .send(another_data);
            
            const transfer_data = {
                token: res._body.token,
                recipeint_email: another_data.email,
                amount: 20000
            }

            const transfer_res = await request(app)
                .post('/api/transfer_fund')
                .send(transfer_data);
            
            expect(transfer_res.status).toBe(422)
            expect(transfer_res._body.success).toBeFalsy()
            expect(transfer_res._body.message).toBe('You do not have enough funds')
        })
    })

    describe('Withdraw fund from account', () => {
        it('should be able to withdraw fund from account', async () => {
            const data = {
                firstname: 'John',
                lastname: 'Doe',
                username: 'johndoe',
                email: 'johndoe@yahoo.com',
                password: 'password'
            }

            const res = await request(app)
                .post('/api/create_account')
                .send(data);

            const fund = {
                token: res._body.token,
                amount: 10000
            };

            await request(app)
                .post('/api/fund_account')
                .send(fund);

            const withdraw_data = {
                token: res._body.token,
                amount: 2000
            }

            const withdral_res = await request(app)
                .post('/api/withdraw_fund')
                .send(withdraw_data);
            
            expect(withdral_res.status).toBe(201)
            expect(withdral_res._body.success).toBeTruthy()
            expect(withdral_res._body.message).toBe(`You have successfully withdrawn ${withdraw_data.amount} funds`)
        })
    })
})
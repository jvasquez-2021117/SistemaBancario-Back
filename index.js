'use strict'

require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const adminDefault = require('./src/user/user.controller')
const typesAccountsDefault = require('./src/typeAccount/typeAccount.controller')
const accountDefault = require('./src/account/account.controller')

mongoConfig.connect();
app.initServer();
const defaults = async () => {
    try {
        await typesAccountsDefault.typesAccountDefault();
        await adminDefault.defaults();
        await accountDefault.accountDefault();
    } catch (e) {
        console.error(e);
    }
}
defaults();
'use strict'

require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const adminDefault = require('./src/user/user.controller')
const typesAccountsDefault = require('./src/typeAccount/typeAccount.controller')

mongoConfig.connect();
app.initServer();
adminDefault.adminDefault()
typesAccountsDefault.typesAccountDefault();
'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3200;

const userRoutes = require('../src/user/user.routes')
const accountRoutes = require('../src/account/account.routes');
const despositRoutes = require('../src/deposit/desposit.routes');
const transferRoutes = require('../src/trasnfers/transfers.routes');
const typeAccountRoutes = require('../src/typeAccount/typeAccount.routes');
const servicesRoutes = require('../src/ProductServices/services.router')
const productRoutes = require('../src/product/product.router')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/deposit', despositRoutes);
app.use('/transfer', transferRoutes);
app.use('/typeAccount', typeAccountRoutes);
app.use('/services', servicesRoutes)
app.use('/product', productRoutes)

exports.initServer = () => {
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}
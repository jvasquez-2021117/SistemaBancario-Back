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
const servicesRoutes = require('../src/ProductServices/services.routes');
const productRoutes = require('../src/product/product.routes');
const historyServices = require('../src/shoppingHistoryServices/shoppingHistoryServices.routes');
const historyProducts = require('../src/historyProducts/historyProducts.routes');
const historyTransfer = require('../src/historyTransfer/historyTransfer.routes');
const historyDeposit = require('../src/historyDeposit/historyDeposit.routes');
const favoites = require('../src/favorite/favorite.routes');
const shopProduct = require('../src/shopProduct/shopProduct.routes');
const shopService = require('../src/shopService/shopService.routes')

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
app.use('/services', servicesRoutes);
app.use('/product', productRoutes);
app.use('/historyServices', historyServices);
app.use('/historyProducts', historyProducts);
app.use('/historyTransfer', historyTransfer);
app.use('/historyDeposit', historyDeposit);
app.use('/favorite', favoites);
app.use('/shopProduct', shopProduct);
app.use('/shopService', shopService);

exports.initServer = () => {
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}
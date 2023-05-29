'use strict'

const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
    try {
        let payload = {
            sub: user._id,
            name: user.name,
            noAccount: user.noAccount,
            dpi: user.dpi,
            adress: user.adress,
            phone: user.phone,
            email: user.email,
            work: user.work,
            salary: user.salary,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 120)
        }
        return jwt.sign(payload, `$(procces.env.SECRET_KEY)`);
    } catch (e) {
        console.error(e);
        return e;
    }
}
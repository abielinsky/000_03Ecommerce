const jwt = require('jsonwebtoken')
const fs = require('fs')
const createError = require('http-errors')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8');

const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        {
            return next(res.status(401).send('user not authorized!'));
        }

        req.decodedToken = decodedToken
        return next()
    })
}



module.exports = verifyUsersJWTPassword
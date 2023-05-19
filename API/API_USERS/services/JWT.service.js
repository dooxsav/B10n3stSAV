const JWT = require('jsonwebtoken')
const JWTConfig = require('../config/JWT.config.json')

const JWTService = {
    generateToken: (payload) => {
        return JWT.sign(payload, JWTConfig.development.secretKey)
    },
    verifyToken: (token) => {
        return JWT.verify(token, JWTConfig.development.secretKey).then(
            decodedToken => {
                return decodedToken
            }
        ).catch(
            error => {
                return error.message
            }
        )
    }
}

module.exports = JWTService
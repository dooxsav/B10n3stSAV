const JWT = require('jsonwebtoken')
const JWTConfig = require('../config/JWT.config.json')

const JWTService = {
    generateToken: (payload) => {
        return JWT.sign(payload, JWTConfig.development.secretKey, {expiresIn: '1h'})
    },
    verifyToken: (token) => {
        try {
            const decodedToken = JWT.verify(token, JWTConfig.development.secretKey)
            return decodedToken
        } catch (error) {
            return error.message; 
        }
    }
}

module.exports = JWTService
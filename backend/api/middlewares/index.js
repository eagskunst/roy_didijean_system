const { checkAuthToken } = require("./authHandler")
const validatorHandler = require("./validatorHandler")

function adminRouteMiddleWare(schema, property) {
    return (req, res, next) => {
        checkAuthToken(req, res, (err) => {
            if (err) {
                return next(err)
            }
            validatorHandler(schema, property)(req, res, (err) => {
                if (err) {
                    return next(err)
                }
                next()
            })
        })
    }
}

module.exports = adminRouteMiddleWare
const boom  = require("@hapi/boom");
const jwt = require('jsonwebtoken')
const { config } = require("../../config/config");

function checkApiKey(req, res, next) {
  const apikey = req.headers['api']
  if (apikey === config.apiKey) next()
  else next(boom.unauthorized())
}

function checkAuthToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return next(boom.unauthorized('Missing or invalid JWT token'));
  }
  const tokenWithoutBearer = token.slice(7);

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, config.secretKey);
    req.loggedUser = decodedToken;
    next();
  } catch (error) {
    return next(boom.unauthorized('Invalid JWT token'));
  }
}

function checkRole(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('se requieren permisos de administrador'));
    }
  }
}

module.exports = { checkApiKey, checkRole, checkAuthToken }

const express = require('express')
const cors = require('cors');
const passport = require('passport');
const { config } = require('./config/config');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')
const routerApi = require('./routes');
const { logErrors, errorHandler, queryErrorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express()
const port = config.port

app.use(express.json())
app.use(cors())

//swagger spec
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Roy dijean API",
      version: "1.0.0"
    }
  },
  apis: [`${path.join(__dirname, "./routes/**/*.js")}`]
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(passport.initialize());
require('./utils/auth')

//routing
routerApi(app)

//middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(queryErrorHandler)
app.use(errorHandler)
app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

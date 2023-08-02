const express = require('express')
const cors = require('cors');
const passport = require('passport');
const { config } = require('./config/config');
const routerApi = require('./routes');
const { logErrors, errorHandler, queryErrorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express()
const port = config.port

app.use(express.json())
app.use(cors())

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

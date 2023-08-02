const express = require('express')
const cors = require('cors');
const { config } = require('./config/config');
const routerApi = require('./routes');

const app = express()
const port = config.port

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//routing
routerApi(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

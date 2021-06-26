const express = require('express')
const app = express()

app.use(express.json({ limit: '50mb'}));

app.post('/api/stores', (req, res) => {
  let dbStores = req.body;
})

app.get('/', (req, res) => {
  
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})
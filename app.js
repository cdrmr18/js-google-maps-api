const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Store = require('./api/models/store');

mongoose.connect('mongodb+srv://ktavia:@cluster0.bstqd.mongodb.net/GoogleMapsApp?retryWrites=true&w=majority', {useNewUrlParser: true}, 
{ useUnifiedTopology: true });

app.use(express.json({ limit: '50mb'}));

app.post('/api/stores', (req, res) => {
    let dbStores = req.body;
    res.send('sent post');
})

app.get('/', (req, res) => {
    res.send('sent get');
})

app.delete('/api/stores', (req, res) => {
    Store.deleteMany({}, (err)=> {
        res.status(200).send(err);
    })
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})
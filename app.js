const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Store = require('./api/models/store');

mongoose.connect('mongodb+srv://ktavia:@cluster0.bstqd.mongodb.net/GoogleMapsApp?retryWrites=true&w=majority', {useNewUrlParser: true}, 
{ useUnifiedTopology: true });

app.use(express.json({ limit: '50mb'}));

app.post('/api/stores', (req, res) => {
    let stores = req.body;
    let dbStores = [];

    stores.forEach((store) => {
        dbStores.push({
            storeName:  store.name, 
            phoneNumber:   store.phoneNumber,
            address: store.address,
            openStatusText: store.openStatusText,
            addressLines: store.addressLines,
            location: {
                type: 'Point',
                coordinates: [
                    store.coordinates.longitude,
                    store.coordinates.latitude
                ]
            }
        });
    })

    Store.create(dbStores, (err, stores) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(stores);
        }
    })
})

app.get('/api/stores', (req, res) => {
    Store.find({}, (err, stores) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(stores);
        }
    });
    
})

app.delete('/api/stores', (req, res) => {
    Store.deleteMany({}, (err)=> {
        res.status(200).send(err);
    })
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})
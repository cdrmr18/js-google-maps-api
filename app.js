const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');
const Store = require('./api/models/store');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

mongoose.connect('mongodb+srv://ktavia:D5JGjXVo3t7CO17d@cluster0.bstqd.mongodb.net/GoogleMapsApp?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

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
    const zipCode = req.query.zip_code;
    const googleMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    axios.get(googleMapsUrl, {
        params: {
            address: zipCode,
            key: process.env.API_Key
        } 
    }).then((response) => {
        const data = response.data;
        const coordinates = [response.data.results[0].geometry.location.lng, response.data.results[0].geometry.location.lat]

        Store.find({
            location: {
                $near: {
                    $maxDistance: 3218,
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    }
                }
            }
        }, (err, stores) => {
            if(err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(stores);
            }
        })
    }).catch((err) => {
        console.log(err);
    })
})

app.delete('/api/stores', (req, res) => {
    Store.deleteMany({}, (err)=> {
        res.status(200).send(err);
    })
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})
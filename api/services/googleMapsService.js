const axios = require('axios');

const googleMapsUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

class GoogleMaps {

    async getCoordinates(zipCode) {
        let coordinates = [];
        await axios.get(googleMapsUrl, {
            params: {
                address: zipCode,
                key: process.env.API_Key
            } 
        }).then((response) => {
            const data = response.data;
            coordinates = [response.data.results[0].geometry.location.lng, response.data.results[0].geometry.location.lat]
        }).catch((error) =>{
            throw new Error (error);
        })
        return coordinates;
    }
}

module.exports = GoogleMaps;
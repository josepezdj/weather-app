const request = require('postman-request');
const chalk = require('chalk');

const geocode = (address, callback) => {
    const newData = encodeURIComponent(address);
    const token = 'pk.eyJ1Ijoiam9zZXBlemRqIiwiYSI6ImNrcDhrZDBydjA5cm0yem9nNzE3bTdsd3AifQ.HlereHhvm5yhO0us4rKWBA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${newData}.json?access_token=${token}&limit=1`;

    request({url}, (error, response, body) => {
        if(error) {
            callback('Unable to connect to lcation services.', undefined)
        } else {
            const data = JSON.parse(body);
            if (data.message === 'Not Found' || data.features.length === 0) {             
                callback('Location not found! Try another search.', undefined)
            } else {
                callback(undefined, {
                    longitude: data.features[0].center[0],
                    latitude: data.features[0].center[1],
                    location: data.features[0].place_name
                })
            }
        }
    })
    
};

module.exports = geocode
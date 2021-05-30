const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const key = '3fe03dd747b7e607f4ea5a95316d410d';
    if(lat === '' || long === '' || isNaN(lat) || isNaN(long)) {
        callback('Please provide valid longitude and latitude.', undefined)
    } else {
        const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`;

        request({url}, (error, response, body) => {
            if(error) {
                callback('Unable to connect to lcation services.', undefined)
            } else {
                const data = JSON.parse(response.body);
                if (data.error) {        
                    console.log(data.error)     
                    callback('Place not Found! Try another search.', undefined)
                } else {                
                    callback(undefined, {
                        location: data.location.name,
                        forecast: data.current.weather_descriptions[0],
                        temperature: data.current.temperature
                    })
                }
            }
        })
    }
};


module.exports = forecast
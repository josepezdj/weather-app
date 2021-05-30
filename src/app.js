const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

// Settings

const port = 3000;
app.set('port', process.env.PORT || port);
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'jDEV Org - 2021'
    })    
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'jDEV Org - 2021'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'jDEV Org - 2021'
    })
});
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an adress!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    });
});
app.get('/help/:route', (req, res) => {
    res.render('404', {
        title: `Error: ${req.params.route} Help Page Not Found!`,
        name: 'jDEV Org - 2021'
    })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404: Page Not Found',
        name: 'jDEV Org - 2021'
    })
});

// Init

app.listen(app.get('port'), () => console.log('Server listening on port', app.get('port')));
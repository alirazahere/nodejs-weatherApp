const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')


// Setup handlers and views
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
app.set('view options', { layout: '/layouts/main' });
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Ali Raza'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ali Raza'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ali Raza',
        message: 'This is an nodejs App build using express.js server and hbs for handlebars.'
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address is needed.'
        })
    }
    geocode(req.query.address, (error, {
        location,
        lattitude,
        longitude
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(lattitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                address: req.query.address,
                forcast: forcastData
            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Artical',
        error: 'Artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: '404 page not found.'
    })
})




app.listen(3000, () => {
    console.log('server is up');
})
const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// root paage
app.get('', (req, res) => {
    res.render('index', {
        title: 'Počasie',
        name: 'Igor Raab'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Počasie',
        name: 'Igor Raab'
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Počasie',
        helpText: 'Let us to help you!',
        name: 'Igor Raab'
    })
})

// weather page
app.get('/weather', (req, res) => {
    
    const address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide address!'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
    
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Eror!',
        errorText: 'Help article not found',
        name: 'Igor Raab'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Eror!',
        errorText: 'Page not found!',
        name: 'Igor Raab'
    })
})

// server start
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
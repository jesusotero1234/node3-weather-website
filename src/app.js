const path = require('path')
const express = require('express')
const notes = require('../../notes-app/notes.json')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')  
const port = process.env.PORT || 3000


//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hablebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {

        title: 'Weather app',
        name: 'Jesus Otero'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {

        title: 'About me',
        name: 'Jesus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'HEEEEELP',
        title: 'This is some helpful text',
        name: "Jesus"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        forecast(latitude, longitude, (error, forecastData) => {
            error === undefined ? forecastData : res.send({ error }),


            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Jesus Otero'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Jesus Otero'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
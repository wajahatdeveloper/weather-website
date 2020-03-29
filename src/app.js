const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars view engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: "someone"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: "Wajahat Developer"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:  'Wajahat Developer',
        message: "this is a help message"
    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address) {
        return res.send({
            error: 'Error : Adress must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name : 'Wajahat Developer',
        error: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name : 'Wajahat Developer',
        error: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
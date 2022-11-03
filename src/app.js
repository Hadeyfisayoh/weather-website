const path = require('path');
const geocode = require('./geocode');
const forecast = require('./forecast');
const express = require('express');
const hbs = require('hbs');


const app = express()
const publicDirectory= path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')
app.set('view engine', 'hbs')

app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
res.render('index', {
     title: 'Weather App',
     name: 'Fisayo'
   })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name:'Fisayo'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name : 'Fisayo'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.location) {
        return res.send({
            error: 'please provide a location'
        })
    }
    geocode(req.query.location, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({ error});
        }
         forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.location
            });
        
        })
    })
    // res.send({
    //     forecast : 'It is sunny',
    //     location: 'Abeokuta',
    //     address: req.query.location
    // })
})

app.get('/products', (req, res)=>{
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=> {
      res.render('404', {
        title: '404',
        name: 'Fisayo',
        errorMessage:'Help not found'
      })
})

app.get('*', (req, res)=>{
     res.render('404', {
        title: '404',
        name: 'Fisayo',
        errorMessage: 'Page  not found'
     })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})

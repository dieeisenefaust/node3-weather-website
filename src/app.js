const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
//console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locatinos
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Murvine'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Murvine'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is an example of the helpful stuff I might post here.',
        title: 'Help',
        name: 'Michael Murvine'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    // console.log(req.query.address);

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }); 

        });
    });   
});

app.get('/products', (req, res) => {
    //use req.query to access additional values passed to server
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    
    res.send({
        products: []
    });    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Michael Murinve'
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Michael Murinve'
    });
});

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Michael',
//             age: 35
//         },
//         {
//             name: 'Audrey'
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');    
// });

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
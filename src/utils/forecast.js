const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/13106a78cea627ccc050cc750ff15650/' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find the specified location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out with a low of ' + body.daily.data[0].temperatureLow + ' and high of ' + body.daily.data[0].temperatureHigh + '. There is a ' + body.currently.precipProbability + '% chance of rain. Wind speeds of up to ' + body.currently.windSpeed + ' mph.');
        }
    });
};

module.exports = forecast;
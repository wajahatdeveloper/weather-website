
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/dccfccf1b3ef5f374cdcc5a4d1d0de6a/" + latitude + "," + longitude

    request({ url, json: true }, (error , { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location, Try another search', undefined)
        } else {
            const temperature = body.currently.temperature
            const rainChance = body.currently.precipProbability
            callback(undefined , `it is currently ${temperature} degrees out. There is a ${rainChance}% chance of rain`)
        }
    })
}

module.exports = forecast
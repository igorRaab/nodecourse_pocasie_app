const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1617ce227b28bbc83744aab6265f685f/'+ latitude + ',' + longitude + '?units=si&lang=sk'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Aktuálne je vonku ' + body.currently.temperature + ' stupňov. Pravdepodobnosť dažďa je ' + body.currently.precipProbability + ' %.')
        }
    })
}

module.exports = forecast

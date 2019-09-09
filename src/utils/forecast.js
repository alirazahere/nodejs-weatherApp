const request = require('request')

const forecast = ((lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d7b0926923d5f559dbc8e877ad33d994/' + lattitude + ',' + longitude + ''
    request({url,json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                summary: body.daily.summary
            })
        }
    })
})

module.exports = forecast
const request = require('request')
const geocode = ((address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWxpcmF6YS1oZXJlIiwiYSI6ImNrMDNoNmZzZDF2MmIzbXByMjdsb254bjgifQ._a2FkftqpW7nzFtsjyGL9w"
    request({ url: url, json: true }, (error,{body}) => {
        if (error) {
            callback('unable to connect to location service', undefined)
        } else if (body.message || body.features == 0) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
})

module.exports = geocode
const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiamVzdXNvdGVvIiwiYSI6ImNrMmFiNDA0YzExbW4zZm9idzh1eHB1dWQifQ.roPMosGdBSfmAH8-uudyLw&limit=1`

    request({ url: url, json: true }, (error, {body: data}) => {
        if (error) { callabck('Unable to connect to location services') }
        else if (data.features.length === 0) { callback('Unable to find your location') }
        else {
            const longitude = data.features[0].center[0]
            const latitude = data.features[0].center[1]
            const location = data.features[0].place_name
            
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode
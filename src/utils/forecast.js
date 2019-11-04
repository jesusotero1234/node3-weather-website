const request = require('request')
const moment = require('moment')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/0db8ddf36f7182212382104dbcb7aefd/${latitude},${longitude}?units=si`

    request({ url: url, json: true }, (error, {body}={}) => {
        const data = body.currently
        if (error) { callback('Unable to connect the weather service') }
        else if (body.error) { callback('Unable to find your location') }
        else {
            debugger
            const time = moment().format((data.time,"dddd, MMMM Do YYYY, h:mm:ss a"))
            callback(undefined,`it is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain.` && `\n` && `${time}` )
        }
    })
}

module.exports = forecast
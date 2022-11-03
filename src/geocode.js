const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyZGV5ZmlzYXlvaCIsImEiOiJjbDk5MXB5aDUwdTM5M29sbW5jajBvZnc3In0.uS_M9Q_gsC5YLUgPeUaN-w'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

// const geo ='https://api.mapbox.com/geocoding/v5/mapbox.places/lagos.json?access_token=pk.eyJ1IjoiaGFyZGV5ZmlzYXlvaCIsImEiOiJjbDk5MXB5aDUwdTM5M29sbW5jajBvZnc3In0.uS_M9Q_gsC5YLUgPeUaN-w&limit=1'
// request({url: geo, json: true}, function (error, response) {
//     if (error) {
//         console.log('Unable to connect to location services');
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location');
//     } else {
//         const latitute =response.body.features[0].center[1]
//         const longitude =response.body.features[0].center[0]
//         console.log(latitute, longitude);
//     }
    
// }) 

module.exports = geocode
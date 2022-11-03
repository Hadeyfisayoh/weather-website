const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6311e1aa6d0d6b488eba9efe49f57c11&query=' + longitude + ',' + latitude + ''
    request({url, json: true}, (error, {body})=> {
      if (error) {
        callback('Unable to connect to the weather service')
      } else if (body.error){
        callback('Unable to find location')
      }else {
        callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature + ' feels like '+ body.current.feelslike)
      }
    })

}
module.exports = forecast
// const url ='http://api.weatherstack.com/current?access_key=6311e1aa6d0d6b488eba9efe49f57c11&query=37.8267,-122.4233&units=m'
// request({url: url, json: true}, function (error, response) {
//     if (error) {
//         console.log('Unable to connect to the weather service');
//     }else if (response.body.error) {
//         console.log('Unable to find location');
//     }else {
//         console.log(response.body.current.weather_descriptions[0] +'. It is currently '+ response.body.current.temperature + ' feels like '+ response.body.current.feelslike);
//     }
    
   
    
// }) 
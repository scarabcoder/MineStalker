var express = require('express')
var app = express()
var request = require("request")
app.set('view engine', 'pug')
app.use(express.static('views'))

var getIDURL = "https://api.mojang.com/users/profiles/minecraft/";

var getNames = "https://api.mojang.com/user/profiles/uuid/names";

app.use('/views', express.static('views'))


app.get('/user/*', function (req, res) {

  request({
    url: getIDURL + req.url.replace("/user/", ""),
    json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {

        request({url: getNames.replace("uuid", body.id), json: true}, function (error, response, body2) {
          body2.reverse();
          res.render('index', { username: req.url.replace("/user/", ""), uuid: body.id, names: body2, isError: false})
        })


      }else{
        res.render('index', { isError: true })
      }
  })





})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

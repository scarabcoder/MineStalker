var express = require('express')
var app = express()
var request = require("request")
app.set('view engine', 'pug')

app.get('/user/*', function (req, res) {
  var uuid = ""

request({url: "https://api.mojang.com/users/profiles/minecraft/" + req.url.replace("/user/", ""), json: true}, function(error, response, body) {

  uuid = body.id;
  var url = "https://api.mojang.com/user/profiles/" + uuid + "/names"
  console.log(url)
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
          console.log(body[0]) // Print the json response
          res.render(
              'index',
              { title: 'Hey Hey Hey!', rows: body})
      }else{

      }
  })
})



})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

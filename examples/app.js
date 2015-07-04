'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

var toa = require('toa')
var toaMejs = require('../index')

var app = toa(function () {
  var users = [{
    name: 'Toa 1'
  }, {
    name: 'Toa 2'
  }, {
    name: 'Toa 3'
  }]
  this.render('content', {users: users})
})

var locals = {
  version: 'v1.0.0',
  now: function () {
    return new Date()
  },
  ip: function () {
    return this.ip
  }
}

toaMejs(app, 'examples/views/*.html', {
  layout: 'template',
  locals: locals
})

module.exports = app.listen(3000)

console.log('open http://localhost:3000')

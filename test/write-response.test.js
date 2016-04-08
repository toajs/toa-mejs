'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

var toa = require('toa')
var tman = require('tman')
var request = require('supertest')
var render = require('..')

tman.suite('test/write-response.test.js', function () {
  tman.suite('writeResp option', function () {
    tman.it('should return html with default configuration and writeResp option = false', function () {
      var app = toa()
      render(app, 'examples/views/*.html', {
        layout: 'template.oc',
        delimiter: '$'
      })

      app.use(function (next) {
        this.type = 'html'
        this.body = this.render('user.oc', {
          user: {name: 'zensh'},
          writeResp: false
        })
        next()
      })

      return request(app.listen())
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/zensh/)
        .expect(200)
    })

    tman.it('should return html with configuration writeResp = false', function () {
      var app = toa()
      render(app, 'examples/views/*.html', {
        layout: 'template.oc',
        delimiter: '$',
        writeResp: false
      })

      app.use(function (next) {
        this.type = 'html'
        this.body = this.render('user.oc', {
          user: {name: 'zensh'},
          writeResp: false
        })
        next()
      })

      return request(app.listen())
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/zensh/)
        .expect(200)
    })
  })
})

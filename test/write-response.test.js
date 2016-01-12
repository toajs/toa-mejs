'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

/*global describe, it */

var render = require('..')
var request = require('supertest')
var toa = require('toa')

describe('test/write-response.test.js', function () {
  describe('writeResp option', function () {
    it('should return html with default configuration and writeResp option = false', function (done) {
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

      request(app.listen())
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/zensh/)
        .expect(200, done)
    })

    it('should return html with configuration writeResp = false', function (done) {
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

      request(app.listen())
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/zensh/)
        .expect(200, done)
    })
  })
})

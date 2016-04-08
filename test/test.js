'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

var toa = require('toa')
var tman = require('tman')
var assert = require('assert')
var request = require('supertest')
var render = require('..')

tman.suite('test/test.js', function () {
  tman.suite('intman.it()', function () {
    var app = toa()

    tman.it('should throw error if no pattern', function () {
      assert.throws(function () {
        render(app)
      })
    })
  })

  tman.suite('server', function () {
    tman.it('should render page ok', function () {
      var app = require('../examples/app')
      return request(app)
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/<title>toa mejs<\/title>/)
        .expect(/server time is: /)
        .expect(/Toa/)
        .expect(200)
    })

    tman.it('should render page ok with custom open/close', function () {
      var app = toa()
      render(app, 'examples/views/*.html', {
        layout: 'template.oc',
        delimiter: '$'
      })

      app.use(function (next) {
        this.render('user.oc', {
          user: {name: 'zensh'}
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

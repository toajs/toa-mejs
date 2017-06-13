'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

const Toa = require('toa')
const tman = require('tman')
const request = require('supertest')
const render = require('..')

tman.suite('test/write-response.test.js', function () {
  tman.suite('writeResp option', function () {
    tman.it('should return html with default configuration and writeResp option = false', function () {
      const app = new Toa()
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
      const app = new Toa()
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

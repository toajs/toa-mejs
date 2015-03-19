'use strict';
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

/*global describe, it, before, after, beforeEach, afterEach*/

var assert = require('assert');
var render = require('../index');
var request = require('supertest');
var toa = require('toa');

describe('test/test.js', function() {
  describe('init()', function() {
    var app = toa();

    it('should throw error if no pattern', function() {
      assert.throws(function() {
        render(app);
      });
    });
  });

  describe('server', function() {
    it('should render page ok', function(done) {
      var app = require('../examples/app');
      request(app)
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/<title>toa mejs<\/title>/)
        .expect(/server time is: /)
        .expect(/Toa/)
        .expect(200, done);
    });

    it('should render page ok with custom open/close', function(done) {
      var app = toa();
      render(app, 'examples/views/*.html', {
        layout: 'template.oc',
        delimiter: '$'
      });

      app.use(function(next) {
        this.render('user.oc', {
          user: {name: 'zensh'}
        });
        next();
      });

      request(app.listen(3000))
        .get('/')
        .expect('content-type', 'text/html; charset=utf-8')
        .expect(/zensh/)
        .expect(200, done);
    });
  });
});

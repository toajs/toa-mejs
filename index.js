'use strict'
// **Github:** https://github.com/toajs/toa-mejs
//
// **License:** MIT

const mejsCompile = require('mejs')

/**
 * set app.context.render
 *
 * @param {Application} app toa application instance
 * @param {Object} settings user settings
 */
module.exports = function (app, pattern, options) {
  if (app.context.render) throw new Error('app.context.render exist!')
  if (!pattern) throw new Error('pattern required')

  options = options || {}
  options.writeResp = options.writeResp !== false

  const mejs = app.mejs = mejsCompile.initMejs(pattern, options)

  app.context.render = function (view, data) {
    data = merge(data || {}, mejs.locals, this)

    let html = mejs.renderEx(view, data)
    if (data.writeResp === true || (options.writeResp && data.writeResp !== false)) {
      this.type = 'html'
      this.body = html
    }
    return html
  }
}

/**
 * Expose mejs
 */

module.exports.mejs = mejsCompile

function merge (target, source, ctx) {
  for (let key of Object.keys(source)) {
    if (key in target) continue
    assignment(source[key], key)
  }
  return target

  function assignment (value, key) {
    if (typeof value !== 'function') target[key] = value
    else target[key] = function () { return value.apply(ctx, arguments) }
  }
}

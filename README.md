# toa-mejs

Mejs render module for toa, it is available for koa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

## [toa](https://github.com/toajs/toa)

## [Mejs](https://github.com/teambition/mejs) -- Moduled and Embedded JavaScript templates

### Example

```js
const Toa = require('toa')
const toaMejs = require('toa-mejs')

const app = new Toa()
app.use(function () {
  return this.render('user', {name: 'toa', age: 1})
})

toaEjs(app, 'views/**/*.html', {
  layout: 'template',
  locals: locals
})

app.listen(3000)
```

Or you can checkout the [example](https://github.com/toajs/toa-mejs/tree/master/examples).

## Installation

```bash
npm install toa-mejs
```

## API

```js
const toaMejs = require('toa-mejs')
```

### toaMejs(app, pattern, options)

It will add `render` method to `context`.

- `pattern`: [Glob](https://github.com/isaacs/node-glob) pattern to read template files.
- `options.layout`: global layout template name, default is `undefined`.
- `options.locals`: global locals, can be function type, `this` in the function is toa's `context`.
- `options.writeResp`: Write template to response body, default is `true`.
- `options.glob`: Glob options
- `options.base`: Everything before a glob (same as tplName) starts, default is `''`.
- `options.delimiter`: Character to use with angle brackets for open/close, default is `%`.
- `options.rmWhitespace`: Remove all safe-to-remove whitespace, including leading and trailing whitespace. It also enables a safer version of `-%>` line slurping for all scriptlet tags (it does not strip new lines of tags in the middle of a line).

### context.render(viewName, [data])

It is a synchronization function. return template string that filled with data.

- `data.layout`: layout template name, default is `undefined`, set `false` to disable global layout.
- `data.writeResp`: Write template to response body, default is `true`.
- ...

```js
this.render('user', {name: 'toa', age: 1})
```

```js
this.render('user', {name: 'toa', age: 1, writeResp: false})
```

### Layouts

`toa-mejs` support layout. no default layout, if you want to use default layout template, use `options.layout`. Also you can specify layout by `data.layout` in `this.render`.
Also you can set `layout = false;` to close layout.

```html
<html>
  <head>
    <title>toa mejs</title>
  </head>
  <body>
    <h3>toa mejs</h3>
    <%- it.body %>
  </body>
</html>
```

### Include

support mejs default include.

```html
<div>
  <%- include('user/show', {user: user}); %>
</div>
```

### Locals

pass gobal locals by `options.locals`, locals can be functions that can be called in mejs templates.

```js
const locals = {
  version: 'v1.0.0',
  now: function() {
    return new Date()
  },
  __: function() {
    return this.__.apply(this, arguments) // toa-i18n's `__` method.
  }
}
```

## License

The MIT License (MIT)

[npm-url]: https://npmjs.org/package/toa-mejs
[npm-image]: http://img.shields.io/npm/v/toa-mejs.svg

[travis-url]: https://travis-ci.org/toajs/toa-mejs
[travis-image]: http://img.shields.io/travis/toajs/toa-mejs.svg

[downloads-url]: https://npmjs.org/package/toa-mejs
[downloads-image]: http://img.shields.io/npm/dm/toa-mejs.svg?style=flat-square

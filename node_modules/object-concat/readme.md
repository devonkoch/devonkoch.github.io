# object-concat
> Assigns properties of source object(s) to a new object.

[![Build Status](http://img.shields.io/travis/wilmoore/object-concat.js.svg)](https://travis-ci.org/wilmoore/object-concat.js) [![Code Climate](https://codeclimate.com/github/wilmoore/object-concat.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/object-concat.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install object-concat --save
```

###### npm stats

[![npm](https://img.shields.io/npm/v/object-concat.svg)](https://www.npmjs.org/package/object-concat) [![NPM downloads](http://img.shields.io/npm/dm/object-concat.svg)](https://www.npmjs.org/package/object-concat) [![Dependency Status](https://gemnasium.com/wilmoore/object-concat.js.svg)](https://gemnasium.com/wilmoore/object-concat.js)

## Example

###### basic

```js
var concat = require('object-concat')

var defaults = { level: 1 }
var restored = { player: 'isaac', level: 5 }
var gamedata = concat(defaults, restored)

assert.equal(gamedata.player, 'isaac')
//=> undefined

assert.equal(gamedata.level, 5)
//=> undefined

assert.notDeepEqual(gamedata, defaults)
//=> undefined

assert.notDeepEqual(gamedata, restored)
//=> undefined
```

###### transform

```js
var concat = require('object-concat')

var defaults = { level: 1 }
var restored = { player: 'isaac', level: 5 }
var gamedata = concat(defaults, restored, function (key, sourceVal, targetVal) {
  return key === 'player' ? sourceVal.toUpperCase() : sourceVal
})

assert.equal(gamedata.player, 'ISAAC')
//=> undefined
```

## Features

* Concatenative inheritance.
* Return a new object instead of mutating a `target` object.
* Subsequent source properties overwrite previous.
* Supports optional `iteratee` function allowing transformation of target values.

## Anti-Features

* Will never make you seed your parameter list with an empty object:
  * No `_.extend({}, source)`
* Will never mutate existing objects.
* Will never overwrite native `Object` prototype methods (i.e. `Object.assign` polyfills).

## API

> `concat([sources], [iteratee])`

###### Arguments

 * `[sources]: (…Object)` _The source objects_.
 * `[iteratee]: (Function)` _Function that produces desired target value_ **(must be last parameter)**.
     * `key: (String)` _Object key name_.
     * `sourceVal: (*)` _Object source value_.
     * `targetVal: (*)` _Object target value_.

###### Returns

 * `(Object)` _The new object_.

## Alternatives

> Most, if not all of the alternatives listed have varying semantics so be careful which you choose for your own applications.

* [lodash.assign](https://lodash.com/docs#assign)
* [underscore.extend](http://underscorejs.org/#extend)
* [object-assign](https://www.npmjs.com/package/object-assign)
* [object.assign](https://www.npmjs.com/package/object.assign)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/object-concat.js.svg)](https://github.com/wilmoore/object-concat.js/blob/master/license)

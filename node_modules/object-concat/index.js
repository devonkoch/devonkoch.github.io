'use strict'

/*!
 * exports.
 */

module.exports = concat

/**
 * Assign properties of source object(s) to a new object.
 *
 * @param {...Object} [sources]
 * The source objects.
 *
 * @param {Function|Null} [iteratee]
 * Function for transforming target values (must be last parameter).
 *
 * @return {Object}
 * New object.
 */

function concat (/* [sources], [iteratee] */) {
  var tee = getIteratee(arguments[arguments.length - 1])
  var end = arguments.length
  var idx = -1
  var out = {}

  while (++idx < end) {
    copy(arguments[idx], out, tee)
  }

  return out
}

/**
 * Copy properties from source to target.
 *
 * @param {Object} source
 * Object to get properties from.
 *
 * @param {Object} target
 * Object to assign properties to.
 *
 * @param {Function|Null} iteratee
 * Function for transforming target values.
 *
 * @return {Object}
 * New object.
 */

function copy (source, target, iteratee) {
  for (var key in Object(source)) {
    if (iteratee) {
      target[key] = iteratee(key, source[key], target[key])
    } else {
      target[key] = source[key]
    }
  }

  return target
}

/**
 * Return iteratee if type is `Function`, otherwise, return `null`.
 *
 * @param {Function|Object} iteratee
 * Value that optionally a function.
 *
 * @return {Function|Null}
 * Return iteratee if type is `Function`, otherwise, return `null`.
 */

function getIteratee (iteratee) {
  return typeof iteratee === 'function' ? iteratee : null
}

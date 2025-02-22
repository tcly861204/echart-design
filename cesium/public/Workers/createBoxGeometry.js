define([
  './BoxGeometry-fc9234ab',
  './defaultValue-81eec7ed',
  './GeometryOffsetAttribute-8c5e10db',
  './RuntimeError-8952249c',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './commonjsHelpers',
  './combine-3c023bda',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './VertexFormat-a0b706b0',
], function (e, t, r, o, a, n, b, m, c, u, i, f, s) {
  'use strict'
  return function (r, o) {
    return t.defined(o) && (r = e.BoxGeometry.unpack(r, o)), e.BoxGeometry.createGeometry(r)
  }
})

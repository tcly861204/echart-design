define([
  './defaultValue-81eec7ed',
  './EllipsoidOutlineGeometry-a0c6c90f',
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
  './IndexDatatype-f1dcdf35',
], function (e, t, r, n, i, o, a, u, c, d, f, m, s) {
  'use strict'
  return function (r, n) {
    return (
      e.defined(r.buffer) && (r = t.EllipsoidOutlineGeometry.unpack(r, n)),
      t.EllipsoidOutlineGeometry.createGeometry(r)
    )
  }
})

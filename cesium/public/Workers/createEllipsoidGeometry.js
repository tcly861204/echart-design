define([
  './defaultValue-81eec7ed',
  './EllipsoidGeometry-2873b6fd',
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
  './VertexFormat-a0b706b0',
], function (e, t, r, o, a, n, i, d, b, m, c, s, f, u) {
  'use strict'
  return function (r, o) {
    return (
      e.defined(o) && (r = t.EllipsoidGeometry.unpack(r, o)), t.EllipsoidGeometry.createGeometry(r)
    )
  }
})

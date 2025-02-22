define([
  './CylinderGeometry-856b24ab',
  './defaultValue-81eec7ed',
  './GeometryOffsetAttribute-8c5e10db',
  './RuntimeError-8952249c',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './commonjsHelpers',
  './combine-3c023bda',
  './CylinderGeometryLibrary-76cda53e',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './IndexDatatype-f1dcdf35',
  './VertexFormat-a0b706b0',
], function (e, t, r, a, n, o, b, d, i, m, y, c, u, f, s) {
  'use strict'
  return function (r, a) {
    return (
      t.defined(a) && (r = e.CylinderGeometry.unpack(r, a)), e.CylinderGeometry.createGeometry(r)
    )
  }
})

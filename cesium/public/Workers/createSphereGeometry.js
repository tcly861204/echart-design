define([
  './defaultValue-81eec7ed',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './EllipsoidGeometry-2873b6fd',
  './VertexFormat-a0b706b0',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './commonjsHelpers',
  './combine-3c023bda',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './IndexDatatype-f1dcdf35',
], function (e, t, i, r, o, a, n, s, c, d, l, m, u, p) {
  'use strict'
  function y(i) {
    const o = e.defaultValue(i.radius, 1),
      a = {
        radii: new t.Cartesian3(o, o, o),
        stackPartitions: i.stackPartitions,
        slicePartitions: i.slicePartitions,
        vertexFormat: i.vertexFormat,
      }
    ;(this._ellipsoidGeometry = new r.EllipsoidGeometry(a)),
      (this._workerName = 'createSphereGeometry')
  }
  ;(y.packedLength = r.EllipsoidGeometry.packedLength),
    (y.pack = function (e, t, i) {
      return r.EllipsoidGeometry.pack(e._ellipsoidGeometry, t, i)
    })
  const G = new r.EllipsoidGeometry(),
    f = {
      radius: void 0,
      radii: new t.Cartesian3(),
      vertexFormat: new o.VertexFormat(),
      stackPartitions: void 0,
      slicePartitions: void 0,
    }
  return (
    (y.unpack = function (i, a, n) {
      const s = r.EllipsoidGeometry.unpack(i, a, G)
      return (
        (f.vertexFormat = o.VertexFormat.clone(s._vertexFormat, f.vertexFormat)),
        (f.stackPartitions = s._stackPartitions),
        (f.slicePartitions = s._slicePartitions),
        e.defined(n)
          ? (t.Cartesian3.clone(s._radii, f.radii),
            (n._ellipsoidGeometry = new r.EllipsoidGeometry(f)),
            n)
          : ((f.radius = s._radii.x), new y(f))
      )
    }),
    (y.createGeometry = function (e) {
      return r.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)
    }),
    function (t, i) {
      return e.defined(i) && (t = y.unpack(t, i)), y.createGeometry(t)
    }
  )
})

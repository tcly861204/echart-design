define([
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './defaultValue-81eec7ed',
  './EllipseGeometry-d0240c57',
  './VertexFormat-a0b706b0',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './commonjsHelpers',
  './combine-3c023bda',
  './EllipseGeometryLibrary-ab838696',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './GeometryInstance-4fbf16ba',
  './GeometryPipeline-7ffd77ba',
  './AttributeCompression-80665726',
  './EncodedCartesian3-d9f5c4a4',
  './IndexDatatype-f1dcdf35',
  './IntersectionTests-bc78300e',
  './Plane-3f01019d',
], function (e, t, i, r, o, n, s, l, a, d, m, c, u, p, y, _, G, x, h, f, g) {
  'use strict'
  function b(e) {
    const t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).radius,
      o = {
        center: e.center,
        semiMajorAxis: t,
        semiMinorAxis: t,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        vertexFormat: e.vertexFormat,
        stRotation: e.stRotation,
        shadowVolume: e.shadowVolume,
      }
    ;(this._ellipseGeometry = new r.EllipseGeometry(o)), (this._workerName = 'createCircleGeometry')
  }
  ;(b.packedLength = r.EllipseGeometry.packedLength),
    (b.pack = function (e, t, i) {
      return r.EllipseGeometry.pack(e._ellipseGeometry, t, i)
    })
  const E = new r.EllipseGeometry({
      center: new e.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    w = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      vertexFormat: new o.VertexFormat(),
      stRotation: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      shadowVolume: void 0,
    }
  return (
    (b.unpack = function (t, n, s) {
      const l = r.EllipseGeometry.unpack(t, n, E)
      return (
        (w.center = e.Cartesian3.clone(l._center, w.center)),
        (w.ellipsoid = e.Ellipsoid.clone(l._ellipsoid, w.ellipsoid)),
        (w.height = l._height),
        (w.extrudedHeight = l._extrudedHeight),
        (w.granularity = l._granularity),
        (w.vertexFormat = o.VertexFormat.clone(l._vertexFormat, w.vertexFormat)),
        (w.stRotation = l._stRotation),
        (w.shadowVolume = l._shadowVolume),
        i.defined(s)
          ? ((w.semiMajorAxis = l._semiMajorAxis),
            (w.semiMinorAxis = l._semiMinorAxis),
            (s._ellipseGeometry = new r.EllipseGeometry(w)),
            s)
          : ((w.radius = l._semiMajorAxis), new b(w))
      )
    }),
    (b.createGeometry = function (e) {
      return r.EllipseGeometry.createGeometry(e._ellipseGeometry)
    }),
    (b.createShadowVolume = function (e, t, i) {
      const r = e._ellipseGeometry._granularity,
        n = e._ellipseGeometry._ellipsoid,
        s = t(r, n),
        l = i(r, n)
      return new b({
        center: e._ellipseGeometry._center,
        radius: e._ellipseGeometry._semiMajorAxis,
        ellipsoid: n,
        stRotation: e._ellipseGeometry._stRotation,
        granularity: r,
        extrudedHeight: s,
        height: l,
        vertexFormat: o.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      })
    }),
    Object.defineProperties(b.prototype, {
      rectangle: {
        get: function () {
          return this._ellipseGeometry.rectangle
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return this._ellipseGeometry.textureCoordinateRotationPoints
        },
      },
    }),
    function (t, r) {
      return (
        i.defined(r) && (t = b.unpack(t, r)),
        (t._ellipseGeometry._center = e.Cartesian3.clone(t._ellipseGeometry._center)),
        (t._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid)),
        b.createGeometry(t)
      )
    }
  )
})

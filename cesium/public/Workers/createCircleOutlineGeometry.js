define([
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './defaultValue-81eec7ed',
  './EllipseOutlineGeometry-9911deb7',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './commonjsHelpers',
  './combine-3c023bda',
  './EllipseGeometryLibrary-ab838696',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './IndexDatatype-f1dcdf35',
], function (e, i, t, r, l, n, s, o, a, u, d, c, m, p) {
  'use strict'
  function y(e) {
    const i = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).radius,
      l = {
        center: e.center,
        semiMajorAxis: i,
        semiMinorAxis: i,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        numberOfVerticalLines: e.numberOfVerticalLines,
      }
    ;(this._ellipseGeometry = new r.EllipseOutlineGeometry(l)),
      (this._workerName = 'createCircleOutlineGeometry')
  }
  ;(y.packedLength = r.EllipseOutlineGeometry.packedLength),
    (y.pack = function (e, i, t) {
      return r.EllipseOutlineGeometry.pack(e._ellipseGeometry, i, t)
    })
  const G = new r.EllipseOutlineGeometry({
      center: new e.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    _ = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      numberOfVerticalLines: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
    }
  return (
    (y.unpack = function (i, l, n) {
      const s = r.EllipseOutlineGeometry.unpack(i, l, G)
      return (
        (_.center = e.Cartesian3.clone(s._center, _.center)),
        (_.ellipsoid = e.Ellipsoid.clone(s._ellipsoid, _.ellipsoid)),
        (_.height = s._height),
        (_.extrudedHeight = s._extrudedHeight),
        (_.granularity = s._granularity),
        (_.numberOfVerticalLines = s._numberOfVerticalLines),
        t.defined(n)
          ? ((_.semiMajorAxis = s._semiMajorAxis),
            (_.semiMinorAxis = s._semiMinorAxis),
            (n._ellipseGeometry = new r.EllipseOutlineGeometry(_)),
            n)
          : ((_.radius = s._semiMajorAxis), new y(_))
      )
    }),
    (y.createGeometry = function (e) {
      return r.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)
    }),
    function (i, r) {
      return (
        t.defined(r) && (i = y.unpack(i, r)),
        (i._ellipseGeometry._center = e.Cartesian3.clone(i._ellipseGeometry._center)),
        (i._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(i._ellipseGeometry._ellipsoid)),
        y.createGeometry(i)
      )
    }
  )
})

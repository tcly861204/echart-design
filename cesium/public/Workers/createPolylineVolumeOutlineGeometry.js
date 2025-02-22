define([
  './defaultValue-81eec7ed',
  './Matrix2-47e98d76',
  './arrayRemoveDuplicates-dc2f4046',
  './BoundingRectangle-c745bb9d',
  './Transforms-08771371',
  './ComponentDatatype-a15c9a19',
  './PolylineVolumeGeometryLibrary-bd3abf28',
  './RuntimeError-8952249c',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './IndexDatatype-f1dcdf35',
  './PolygonPipeline-32809f7a',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
  './EllipsoidTangentPlane-aa2df207',
  './AxisAlignedBoundingBox-8b0fdc16',
  './IntersectionTests-bc78300e',
  './Plane-3f01019d',
  './PolylinePipeline-e75581a7',
  './EllipsoidGeodesic-19e75e11',
  './EllipsoidRhumbLine-6145377b',
], function (e, t, n, i, o, a, l, r, s, p, c, d, u, y, g, h, f, m, E, _, b, P) {
  'use strict'
  function k(n) {
    const i = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      o = n.shapePositions
    ;(this._positions = i),
      (this._shape = o),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, l.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(n.granularity, a.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeOutlineGeometry')
    let r = 1 + i.length * t.Cartesian3.packedLength
    ;(r += 1 + o.length * t.Cartesian2.packedLength),
      (this.packedLength = r + t.Ellipsoid.packedLength + 2)
  }
  k.pack = function (n, i, o) {
    let a
    o = e.defaultValue(o, 0)
    const l = n._positions
    let r = l.length
    for (i[o++] = r, a = 0; a < r; ++a, o += t.Cartesian3.packedLength)
      t.Cartesian3.pack(l[a], i, o)
    const s = n._shape
    for (r = s.length, i[o++] = r, a = 0; a < r; ++a, o += t.Cartesian2.packedLength)
      t.Cartesian2.pack(s[a], i, o)
    return (
      t.Ellipsoid.pack(n._ellipsoid, i, o),
      (o += t.Ellipsoid.packedLength),
      (i[o++] = n._cornerType),
      (i[o] = n._granularity),
      i
    )
  }
  const C = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    L = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: C,
      height: void 0,
      cornerType: void 0,
      granularity: void 0,
    }
  k.unpack = function (n, i, o) {
    let a
    i = e.defaultValue(i, 0)
    let l = n[i++]
    const r = new Array(l)
    for (a = 0; a < l; ++a, i += t.Cartesian3.packedLength) r[a] = t.Cartesian3.unpack(n, i)
    l = n[i++]
    const s = new Array(l)
    for (a = 0; a < l; ++a, i += t.Cartesian2.packedLength) s[a] = t.Cartesian2.unpack(n, i)
    const p = t.Ellipsoid.unpack(n, i, C)
    i += t.Ellipsoid.packedLength
    const c = n[i++],
      d = n[i]
    return e.defined(o)
      ? ((o._positions = r),
        (o._shape = s),
        (o._ellipsoid = t.Ellipsoid.clone(p, o._ellipsoid)),
        (o._cornerType = c),
        (o._granularity = d),
        o)
      : ((L.polylinePositions = r),
        (L.shapePositions = s),
        (L.cornerType = c),
        (L.granularity = d),
        new k(L))
  }
  const T = new i.BoundingRectangle()
  return (
    (k.createGeometry = function (e) {
      const r = e._positions,
        u = n.arrayRemoveDuplicates(r, t.Cartesian3.equalsEpsilon)
      let y = e._shape
      if (
        ((y = l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)),
        u.length < 2 || y.length < 3)
      )
        return
      d.PolygonPipeline.computeWindingOrder2D(y) === d.WindingOrder.CLOCKWISE && y.reverse()
      const g = i.BoundingRectangle.fromPoints(y, T)
      return (function (e, t) {
        const n = new p.GeometryAttributes()
        n.position = new s.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: e,
        })
        const i = t.length,
          l = n.position.values.length / 3,
          r = e.length / 3 / i,
          d = c.IndexDatatype.createTypedArray(l, 2 * i * (r + 1))
        let u,
          y,
          g = 0
        u = 0
        let h = u * i
        for (y = 0; y < i - 1; y++) (d[g++] = y + h), (d[g++] = y + h + 1)
        for (d[g++] = i - 1 + h, d[g++] = h, u = r - 1, h = u * i, y = 0; y < i - 1; y++)
          (d[g++] = y + h), (d[g++] = y + h + 1)
        for (d[g++] = i - 1 + h, d[g++] = h, u = 0; u < r - 1; u++) {
          const e = i * u,
            t = e + i
          for (y = 0; y < i; y++) (d[g++] = y + e), (d[g++] = y + t)
        }
        return new s.Geometry({
          attributes: n,
          indices: c.IndexDatatype.createTypedArray(l, d),
          boundingSphere: o.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.LINES,
        })
      })(l.PolylineVolumeGeometryLibrary.computePositions(u, y, g, e, !1), y)
    }),
    function (n, i) {
      return (
        e.defined(i) && (n = k.unpack(n, i)),
        (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)),
        k.createGeometry(n)
      )
    }
  )
})

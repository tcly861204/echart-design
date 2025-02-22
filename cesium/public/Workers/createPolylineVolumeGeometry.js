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
  './GeometryPipeline-7ffd77ba',
  './IndexDatatype-f1dcdf35',
  './PolygonPipeline-32809f7a',
  './VertexFormat-a0b706b0',
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
  './AttributeCompression-80665726',
  './EncodedCartesian3-d9f5c4a4',
], function (e, t, n, o, i, a, r, l, s, p, c, d, u, m, y, g, f, h, b, P, _, E, k, v, V, L) {
  'use strict'
  function x(n) {
    const o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      i = n.shapePositions
    ;(this._positions = o),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, r.CornerType.ROUNDED)),
      (this._vertexFormat = m.VertexFormat.clone(
        e.defaultValue(n.vertexFormat, m.VertexFormat.DEFAULT)
      )),
      (this._granularity = e.defaultValue(n.granularity, a.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeGeometry')
    let l = 1 + o.length * t.Cartesian3.packedLength
    ;(l += 1 + i.length * t.Cartesian2.packedLength),
      (this.packedLength = l + t.Ellipsoid.packedLength + m.VertexFormat.packedLength + 2)
  }
  x.pack = function (n, o, i) {
    let a
    i = e.defaultValue(i, 0)
    const r = n._positions
    let l = r.length
    for (o[i++] = l, a = 0; a < l; ++a, i += t.Cartesian3.packedLength)
      t.Cartesian3.pack(r[a], o, i)
    const s = n._shape
    for (l = s.length, o[i++] = l, a = 0; a < l; ++a, i += t.Cartesian2.packedLength)
      t.Cartesian2.pack(s[a], o, i)
    return (
      t.Ellipsoid.pack(n._ellipsoid, o, i),
      (i += t.Ellipsoid.packedLength),
      m.VertexFormat.pack(n._vertexFormat, o, i),
      (i += m.VertexFormat.packedLength),
      (o[i++] = n._cornerType),
      (o[i] = n._granularity),
      o
    )
  }
  const C = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    F = new m.VertexFormat(),
    A = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: C,
      vertexFormat: F,
      cornerType: void 0,
      granularity: void 0,
    }
  x.unpack = function (n, o, i) {
    let a
    o = e.defaultValue(o, 0)
    let r = n[o++]
    const l = new Array(r)
    for (a = 0; a < r; ++a, o += t.Cartesian3.packedLength) l[a] = t.Cartesian3.unpack(n, o)
    r = n[o++]
    const s = new Array(r)
    for (a = 0; a < r; ++a, o += t.Cartesian2.packedLength) s[a] = t.Cartesian2.unpack(n, o)
    const p = t.Ellipsoid.unpack(n, o, C)
    o += t.Ellipsoid.packedLength
    const c = m.VertexFormat.unpack(n, o, F)
    o += m.VertexFormat.packedLength
    const d = n[o++],
      u = n[o]
    return e.defined(i)
      ? ((i._positions = l),
        (i._shape = s),
        (i._ellipsoid = t.Ellipsoid.clone(p, i._ellipsoid)),
        (i._vertexFormat = m.VertexFormat.clone(c, i._vertexFormat)),
        (i._cornerType = d),
        (i._granularity = u),
        i)
      : ((A.polylinePositions = l),
        (A.shapePositions = s),
        (A.cornerType = d),
        (A.granularity = u),
        new x(A))
  }
  const T = new o.BoundingRectangle()
  return (
    (x.createGeometry = function (e) {
      const l = e._positions,
        m = n.arrayRemoveDuplicates(l, t.Cartesian3.equalsEpsilon)
      let y = e._shape
      if (
        ((y = r.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)),
        m.length < 2 || y.length < 3)
      )
        return
      u.PolygonPipeline.computeWindingOrder2D(y) === u.WindingOrder.CLOCKWISE && y.reverse()
      const g = o.BoundingRectangle.fromPoints(y, T)
      return (function (e, t, n, o) {
        const l = new p.GeometryAttributes()
        o.position &&
          (l.position = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: e,
          }))
        const m = t.length,
          y = e.length / 3,
          g = (y - 2 * m) / (2 * m),
          f = u.PolygonPipeline.triangulate(t),
          h = (g - 1) * m * 6 + 2 * f.length,
          b = d.IndexDatatype.createTypedArray(y, h)
        let P, _, E, k, v, V
        const L = 2 * m
        let x = 0
        for (P = 0; P < g - 1; P++) {
          for (_ = 0; _ < m - 1; _++)
            (E = 2 * _ + P * m * 2),
              (V = E + L),
              (k = E + 1),
              (v = k + L),
              (b[x++] = k),
              (b[x++] = E),
              (b[x++] = v),
              (b[x++] = v),
              (b[x++] = E),
              (b[x++] = V)
          ;(E = 2 * m - 2 + P * m * 2),
            (k = E + 1),
            (v = k + L),
            (V = E + L),
            (b[x++] = k),
            (b[x++] = E),
            (b[x++] = v),
            (b[x++] = v),
            (b[x++] = E),
            (b[x++] = V)
        }
        if (o.st || o.tangent || o.bitangent) {
          const e = new Float32Array(2 * y),
            o = 1 / (g - 1),
            i = 1 / n.height,
            r = n.height / 2
          let p,
            c,
            d = 0
          for (P = 0; P < g; P++) {
            for (p = P * o, c = i * (t[0].y + r), e[d++] = p, e[d++] = c, _ = 1; _ < m; _++)
              (c = i * (t[_].y + r)), (e[d++] = p), (e[d++] = c), (e[d++] = p), (e[d++] = c)
            ;(c = i * (t[0].y + r)), (e[d++] = p), (e[d++] = c)
          }
          for (_ = 0; _ < m; _++) (p = 0), (c = i * (t[_].y + r)), (e[d++] = p), (e[d++] = c)
          for (_ = 0; _ < m; _++)
            (p = (g - 1) * o), (c = i * (t[_].y + r)), (e[d++] = p), (e[d++] = c)
          l.st = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: new Float32Array(e),
          })
        }
        const C = y - 2 * m
        for (P = 0; P < f.length; P += 3) {
          const e = f[P] + C,
            t = f[P + 1] + C,
            n = f[P + 2] + C
          ;(b[x++] = e),
            (b[x++] = t),
            (b[x++] = n),
            (b[x++] = n + m),
            (b[x++] = t + m),
            (b[x++] = e + m)
        }
        let F = new s.Geometry({
          attributes: l,
          indices: b,
          boundingSphere: i.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.TRIANGLES,
        })
        if ((o.normal && (F = c.GeometryPipeline.computeNormal(F)), o.tangent || o.bitangent)) {
          try {
            F = c.GeometryPipeline.computeTangentAndBitangent(F)
          } catch (e) {
            r.oneTimeWarning(
              'polyline-volume-tangent-bitangent',
              'Unable to compute tangents and bitangents for polyline volume geometry'
            )
          }
          o.tangent || (F.attributes.tangent = void 0),
            o.bitangent || (F.attributes.bitangent = void 0),
            o.st || (F.attributes.st = void 0)
        }
        return F
      })(r.PolylineVolumeGeometryLibrary.computePositions(m, y, g, e, !0), y, g, e._vertexFormat)
    }),
    function (n, o) {
      return (
        e.defined(o) && (n = x.unpack(n, o)),
        (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)),
        x.createGeometry(n)
      )
    }
  )
})

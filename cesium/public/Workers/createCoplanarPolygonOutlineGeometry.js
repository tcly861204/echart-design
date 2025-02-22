define([
  './arrayRemoveDuplicates-dc2f4046',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './CoplanarPolygonGeometryLibrary-42a6708e',
  './defaultValue-81eec7ed',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './GeometryInstance-4fbf16ba',
  './GeometryPipeline-7ffd77ba',
  './IndexDatatype-f1dcdf35',
  './PolygonGeometryLibrary-3e37a9d7',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
  './OrientedBoundingBox-89c095b4',
  './EllipsoidTangentPlane-aa2df207',
  './AxisAlignedBoundingBox-8b0fdc16',
  './IntersectionTests-bc78300e',
  './Plane-3f01019d',
  './AttributeCompression-80665726',
  './EncodedCartesian3-d9f5c4a4',
  './ArcType-fc72c06c',
  './EllipsoidRhumbLine-6145377b',
  './PolygonPipeline-32809f7a',
], function (e, t, n, o, r, i, a, c, y, l, s, u, p, d, m, f, g, b, h, P, G, L, T, E, H, A) {
  'use strict'
  function C(e) {
    const t = e.length,
      n = new Float64Array(3 * t),
      o = u.IndexDatatype.createTypedArray(t, 2 * t)
    let i = 0,
      a = 0
    for (let r = 0; r < t; r++) {
      const c = e[r]
      ;(n[i++] = c.x), (n[i++] = c.y), (n[i++] = c.z), (o[a++] = r), (o[a++] = (r + 1) % t)
    }
    const l = new y.GeometryAttributes({
      position: new c.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: n,
      }),
    })
    return new c.Geometry({ attributes: l, indices: o, primitiveType: c.PrimitiveType.LINES })
  }
  function k(e) {
    const t = (e = a.defaultValue(e, a.defaultValue.EMPTY_OBJECT)).polygonHierarchy
    ;(this._polygonHierarchy = t),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength = p.PolygonGeometryLibrary.computeHierarchyPackedLength(t) + 1)
  }
  ;(k.fromPositions = function (e) {
    return new k({
      polygonHierarchy: {
        positions: (e = a.defaultValue(e, a.defaultValue.EMPTY_OBJECT)).positions,
      },
    })
  }),
    (k.pack = function (e, t, n) {
      return (
        (n = a.defaultValue(n, 0)),
        (t[(n = p.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, n))] =
          e.packedLength),
        t
      )
    })
  const _ = { polygonHierarchy: {} }
  return (
    (k.unpack = function (e, t, n) {
      t = a.defaultValue(t, 0)
      const o = p.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t)
      ;(t = o.startingIndex), delete o.startingIndex
      const r = e[t]
      return a.defined(n) || (n = new k(_)), (n._polygonHierarchy = o), (n.packedLength = r), n
    }),
    (k.createGeometry = function (o) {
      const r = o._polygonHierarchy
      let a = r.positions
      if (((a = e.arrayRemoveDuplicates(a, n.Cartesian3.equalsEpsilon, !0)), a.length < 3)) return
      if (!i.CoplanarPolygonGeometryLibrary.validOutline(a)) return
      const y = p.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r, !1)
      if (0 === y.length) return
      const u = []
      for (let e = 0; e < y.length; e++) {
        const t = new l.GeometryInstance({ geometry: C(y[e]) })
        u.push(t)
      }
      const d = s.GeometryPipeline.combineInstances(u)[0],
        m = t.BoundingSphere.fromPoints(r.positions)
      return new c.Geometry({
        attributes: d.attributes,
        indices: d.indices,
        primitiveType: d.primitiveType,
        boundingSphere: m,
      })
    }),
    function (e, t) {
      return (
        a.defined(t) && (e = k.unpack(e, t)),
        (e._ellipsoid = n.Ellipsoid.clone(e._ellipsoid)),
        k.createGeometry(e)
      )
    }
  )
})

define([
  './defaultValue-81eec7ed',
  './Matrix2-47e98d76',
  './ArcType-fc72c06c',
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './EllipsoidTangentPlane-aa2df207',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './GeometryInstance-4fbf16ba',
  './GeometryPipeline-7ffd77ba',
  './IndexDatatype-f1dcdf35',
  './PolygonGeometryLibrary-3e37a9d7',
  './PolygonPipeline-32809f7a',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
  './AxisAlignedBoundingBox-8b0fdc16',
  './IntersectionTests-bc78300e',
  './Plane-3f01019d',
  './AttributeCompression-80665726',
  './EncodedCartesian3-d9f5c4a4',
  './arrayRemoveDuplicates-dc2f4046',
  './EllipsoidRhumbLine-6145377b',
], function (e, t, i, o, r, n, a, l, s, y, u, p, d, c, f, g, m, h, b, P, E, A, _, G, L) {
  'use strict'
  const H = [],
    T = []
  function v(e, t, o, r, n) {
    const p = l.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, H)
    let g, m
    f.PolygonPipeline.computeWindingOrder2D(p) === f.WindingOrder.CLOCKWISE &&
      (p.reverse(), (t = t.slice().reverse()))
    let h = t.length,
      b = 0
    if (r)
      for (g = new Float64Array(2 * h * 3), m = 0; m < h; m++) {
        const e = t[m],
          i = t[(m + 1) % h]
        ;(g[b++] = e.x),
          (g[b++] = e.y),
          (g[b++] = e.z),
          (g[b++] = i.x),
          (g[b++] = i.y),
          (g[b++] = i.z)
      }
    else {
      let r = 0
      if (n === i.ArcType.GEODESIC)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideLineCount(t[m], t[(m + 1) % h], o)
      else if (n === i.ArcType.RHUMB)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(e, t[m], t[(m + 1) % h], o)
      for (g = new Float64Array(3 * r), m = 0; m < h; m++) {
        let r
        n === i.ArcType.GEODESIC
          ? (r = c.PolygonGeometryLibrary.subdivideLine(t[m], t[(m + 1) % h], o, T))
          : n === i.ArcType.RHUMB &&
            (r = c.PolygonGeometryLibrary.subdivideRhumbLine(e, t[m], t[(m + 1) % h], o, T))
        const a = r.length
        for (let e = 0; e < a; ++e) g[b++] = r[e]
      }
    }
    h = g.length / 3
    const P = 2 * h,
      E = d.IndexDatatype.createTypedArray(h, P)
    for (b = 0, m = 0; m < h - 1; m++) (E[b++] = m), (E[b++] = m + 1)
    return (
      (E[b++] = h - 1),
      (E[b++] = 0),
      new u.GeometryInstance({
        geometry: new s.Geometry({
          attributes: new y.GeometryAttributes({
            position: new s.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: g,
            }),
          }),
          indices: E,
          primitiveType: s.PrimitiveType.LINES,
        }),
      })
    )
  }
  function O(e, t, o, r, n) {
    const p = l.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, H)
    let g, m
    f.PolygonPipeline.computeWindingOrder2D(p) === f.WindingOrder.CLOCKWISE &&
      (p.reverse(), (t = t.slice().reverse()))
    let h = t.length
    const b = new Array(h)
    let P = 0
    if (r)
      for (g = new Float64Array(2 * h * 3 * 2), m = 0; m < h; ++m) {
        b[m] = P / 3
        const e = t[m],
          i = t[(m + 1) % h]
        ;(g[P++] = e.x),
          (g[P++] = e.y),
          (g[P++] = e.z),
          (g[P++] = i.x),
          (g[P++] = i.y),
          (g[P++] = i.z)
      }
    else {
      let r = 0
      if (n === i.ArcType.GEODESIC)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideLineCount(t[m], t[(m + 1) % h], o)
      else if (n === i.ArcType.RHUMB)
        for (m = 0; m < h; m++)
          r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(e, t[m], t[(m + 1) % h], o)
      for (g = new Float64Array(3 * r * 2), m = 0; m < h; ++m) {
        let r
        ;(b[m] = P / 3),
          n === i.ArcType.GEODESIC
            ? (r = c.PolygonGeometryLibrary.subdivideLine(t[m], t[(m + 1) % h], o, T))
            : n === i.ArcType.RHUMB &&
              (r = c.PolygonGeometryLibrary.subdivideRhumbLine(e, t[m], t[(m + 1) % h], o, T))
        const a = r.length
        for (let e = 0; e < a; ++e) g[P++] = r[e]
      }
    }
    h = g.length / 6
    const E = b.length,
      A = 2 * (2 * h + E),
      _ = d.IndexDatatype.createTypedArray(h + E, A)
    for (P = 0, m = 0; m < h; ++m)
      (_[P++] = m), (_[P++] = (m + 1) % h), (_[P++] = m + h), (_[P++] = ((m + 1) % h) + h)
    for (m = 0; m < E; m++) {
      const e = b[m]
      ;(_[P++] = e), (_[P++] = e + h)
    }
    return new u.GeometryInstance({
      geometry: new s.Geometry({
        attributes: new y.GeometryAttributes({
          position: new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: g,
          }),
        }),
        indices: _,
        primitiveType: s.PrimitiveType.LINES,
      }),
    })
  }
  function x(o) {
    const r = o.polygonHierarchy,
      n = e.defaultValue(o.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(o.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
      s = e.defaultValue(o.perPositionHeight, !1),
      y = s && e.defined(o.extrudedHeight),
      u = e.defaultValue(o.arcType, i.ArcType.GEODESIC)
    let p = e.defaultValue(o.height, 0),
      d = e.defaultValue(o.extrudedHeight, p)
    if (!y) {
      const e = Math.max(p, d)
      ;(d = Math.min(p, d)), (p = e)
    }
    ;(this._ellipsoid = t.Ellipsoid.clone(n)),
      (this._granularity = l),
      (this._height = p),
      (this._extrudedHeight = d),
      (this._arcType = u),
      (this._polygonHierarchy = r),
      (this._perPositionHeight = s),
      (this._perPositionHeightExtrude = y),
      (this._offsetAttribute = o.offsetAttribute),
      (this._workerName = 'createPolygonOutlineGeometry'),
      (this.packedLength =
        c.PolygonGeometryLibrary.computeHierarchyPackedLength(r) + t.Ellipsoid.packedLength + 8)
  }
  x.pack = function (i, o, r) {
    return (
      (r = e.defaultValue(r, 0)),
      (r = c.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy, o, r)),
      t.Ellipsoid.pack(i._ellipsoid, o, r),
      (r += t.Ellipsoid.packedLength),
      (o[r++] = i._height),
      (o[r++] = i._extrudedHeight),
      (o[r++] = i._granularity),
      (o[r++] = i._perPositionHeightExtrude ? 1 : 0),
      (o[r++] = i._perPositionHeight ? 1 : 0),
      (o[r++] = i._arcType),
      (o[r++] = e.defaultValue(i._offsetAttribute, -1)),
      (o[r] = i.packedLength),
      o
    )
  }
  const C = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    D = { polygonHierarchy: {} }
  return (
    (x.unpack = function (i, o, r) {
      o = e.defaultValue(o, 0)
      const n = c.PolygonGeometryLibrary.unpackPolygonHierarchy(i, o)
      ;(o = n.startingIndex), delete n.startingIndex
      const a = t.Ellipsoid.unpack(i, o, C)
      o += t.Ellipsoid.packedLength
      const l = i[o++],
        s = i[o++],
        y = i[o++],
        u = 1 === i[o++],
        p = 1 === i[o++],
        d = i[o++],
        f = i[o++],
        g = i[o]
      return (
        e.defined(r) || (r = new x(D)),
        (r._polygonHierarchy = n),
        (r._ellipsoid = t.Ellipsoid.clone(a, r._ellipsoid)),
        (r._height = l),
        (r._extrudedHeight = s),
        (r._granularity = y),
        (r._perPositionHeight = p),
        (r._perPositionHeightExtrude = u),
        (r._arcType = d),
        (r._offsetAttribute = -1 === f ? void 0 : f),
        (r.packedLength = g),
        r
      )
    }),
    (x.fromPositions = function (t) {
      return new x({
        polygonHierarchy: {
          positions: (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
        },
        height: t.height,
        extrudedHeight: t.extrudedHeight,
        ellipsoid: t.ellipsoid,
        granularity: t.granularity,
        perPositionHeight: t.perPositionHeight,
        arcType: t.arcType,
        offsetAttribute: t.offsetAttribute,
      })
    }),
    (x.createGeometry = function (t) {
      const i = t._ellipsoid,
        n = t._granularity,
        l = t._polygonHierarchy,
        y = t._perPositionHeight,
        u = t._arcType,
        d = c.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(l, !y, i)
      if (0 === d.length) return
      let g
      const m = [],
        h = a.CesiumMath.chordLength(n, i.maximumRadius),
        b = t._height,
        P = t._extrudedHeight
      let E, A
      if (
        t._perPositionHeightExtrude ||
        !a.CesiumMath.equalsEpsilon(b, P, 0, a.CesiumMath.EPSILON2)
      )
        for (A = 0; A < d.length; A++) {
          if (
            ((g = O(i, d[A], h, y, u)),
            (g.geometry = c.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
              g.geometry,
              b,
              P,
              i,
              y
            )),
            e.defined(t._offsetAttribute))
          ) {
            const e = g.geometry.attributes.position.values.length / 3
            let i = new Uint8Array(e)
            t._offsetAttribute === o.GeometryOffsetAttribute.TOP
              ? (i = o.arrayFill(i, 1, 0, e / 2))
              : ((E = t._offsetAttribute === o.GeometryOffsetAttribute.NONE ? 0 : 1),
                (i = o.arrayFill(i, E))),
              (g.geometry.attributes.applyOffset = new s.GeometryAttribute({
                componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: i,
              }))
          }
          m.push(g)
        }
      else
        for (A = 0; A < d.length; A++) {
          if (
            ((g = v(i, d[A], h, y, u)),
            (g.geometry.attributes.position.values = f.PolygonPipeline.scaleToGeodeticHeight(
              g.geometry.attributes.position.values,
              b,
              i,
              !y
            )),
            e.defined(t._offsetAttribute))
          ) {
            const e = g.geometry.attributes.position.values.length,
              i = new Uint8Array(e / 3)
            ;(E = t._offsetAttribute === o.GeometryOffsetAttribute.NONE ? 0 : 1),
              o.arrayFill(i, E),
              (g.geometry.attributes.applyOffset = new s.GeometryAttribute({
                componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: i,
              }))
          }
          m.push(g)
        }
      const _ = p.GeometryPipeline.combineInstances(m)[0],
        G = r.BoundingSphere.fromVertices(_.attributes.position.values)
      return new s.Geometry({
        attributes: _.attributes,
        indices: _.indices,
        primitiveType: _.primitiveType,
        boundingSphere: G,
        offsetAttribute: t._offsetAttribute,
      })
    }),
    function (i, o) {
      return (
        e.defined(o) && (i = x.unpack(i, o)),
        (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)),
        x.createGeometry(i)
      )
    }
  )
})

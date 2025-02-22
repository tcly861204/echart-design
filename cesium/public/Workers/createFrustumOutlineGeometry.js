define([
  './defaultValue-81eec7ed',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './FrustumGeometry-baede727',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
  './Plane-3f01019d',
  './VertexFormat-a0b706b0',
], function (e, t, r, n, a, u, i, o, s, c, p, m, d) {
  'use strict'
  function h(n) {
    const a = n.frustum,
      i = n.orientation,
      o = n.origin,
      s = e.defaultValue(n._drawNearPlane, !0)
    let c, p
    a instanceof u.PerspectiveFrustum
      ? ((c = 0), (p = u.PerspectiveFrustum.packedLength))
      : a instanceof u.OrthographicFrustum && ((c = 1), (p = u.OrthographicFrustum.packedLength)),
      (this._frustumType = c),
      (this._frustum = a.clone()),
      (this._origin = r.Cartesian3.clone(o)),
      (this._orientation = t.Quaternion.clone(i)),
      (this._drawNearPlane = s),
      (this._workerName = 'createFrustumOutlineGeometry'),
      (this.packedLength = 2 + p + r.Cartesian3.packedLength + t.Quaternion.packedLength)
  }
  h.pack = function (n, a, i) {
    i = e.defaultValue(i, 0)
    const o = n._frustumType,
      s = n._frustum
    return (
      (a[i++] = o),
      0 === o
        ? (u.PerspectiveFrustum.pack(s, a, i), (i += u.PerspectiveFrustum.packedLength))
        : (u.OrthographicFrustum.pack(s, a, i), (i += u.OrthographicFrustum.packedLength)),
      r.Cartesian3.pack(n._origin, a, i),
      (i += r.Cartesian3.packedLength),
      t.Quaternion.pack(n._orientation, a, i),
      (a[(i += t.Quaternion.packedLength)] = n._drawNearPlane ? 1 : 0),
      a
    )
  }
  const f = new u.PerspectiveFrustum(),
    l = new u.OrthographicFrustum(),
    g = new t.Quaternion(),
    _ = new r.Cartesian3()
  return (
    (h.unpack = function (n, a, i) {
      a = e.defaultValue(a, 0)
      const o = n[a++]
      let s
      0 === o
        ? ((s = u.PerspectiveFrustum.unpack(n, a, f)), (a += u.PerspectiveFrustum.packedLength))
        : ((s = u.OrthographicFrustum.unpack(n, a, l)), (a += u.OrthographicFrustum.packedLength))
      const c = r.Cartesian3.unpack(n, a, _)
      a += r.Cartesian3.packedLength
      const p = t.Quaternion.unpack(n, a, g),
        m = 1 === n[(a += t.Quaternion.packedLength)]
      if (!e.defined(i)) return new h({ frustum: s, origin: c, orientation: p, _drawNearPlane: m })
      const d = o === i._frustumType ? i._frustum : void 0
      return (
        (i._frustum = s.clone(d)),
        (i._frustumType = o),
        (i._origin = r.Cartesian3.clone(c, i._origin)),
        (i._orientation = t.Quaternion.clone(p, i._orientation)),
        (i._drawNearPlane = m),
        i
      )
    }),
    (h.createGeometry = function (e) {
      const r = e._frustumType,
        n = e._frustum,
        s = e._origin,
        c = e._orientation,
        p = e._drawNearPlane,
        m = new Float64Array(24)
      u.FrustumGeometry._computeNearFarPlanes(s, c, r, n, m)
      const d = new o.GeometryAttributes({
        position: new i.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: m,
        }),
      })
      let h, f
      const l = p ? 2 : 1,
        g = new Uint16Array(8 * (l + 1))
      let _ = p ? 0 : 1
      for (; _ < 2; ++_)
        (h = p ? 8 * _ : 0),
          (f = 4 * _),
          (g[h] = f),
          (g[h + 1] = f + 1),
          (g[h + 2] = f + 1),
          (g[h + 3] = f + 2),
          (g[h + 4] = f + 2),
          (g[h + 5] = f + 3),
          (g[h + 6] = f + 3),
          (g[h + 7] = f)
      for (_ = 0; _ < 2; ++_)
        (h = 8 * (l + _)),
          (f = 4 * _),
          (g[h] = f),
          (g[h + 1] = f + 4),
          (g[h + 2] = f + 1),
          (g[h + 3] = f + 5),
          (g[h + 4] = f + 2),
          (g[h + 5] = f + 6),
          (g[h + 6] = f + 3),
          (g[h + 7] = f + 7)
      return new i.Geometry({
        attributes: d,
        indices: g,
        primitiveType: i.PrimitiveType.LINES,
        boundingSphere: t.BoundingSphere.fromVertices(m),
      })
    }),
    function (t, r) {
      return e.defined(r) && (t = h.unpack(t, r)), h.createGeometry(t)
    }
  )
})

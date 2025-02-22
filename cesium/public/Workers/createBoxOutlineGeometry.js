define([
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './defaultValue-81eec7ed',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
], function (e, t, n, a, i, r, o, u, s, m, f) {
  'use strict'
  const c = new n.Cartesian3()
  function d(e) {
    const t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).minimum,
      a = e.maximum
    ;(this._min = n.Cartesian3.clone(t)),
      (this._max = n.Cartesian3.clone(a)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createBoxOutlineGeometry')
  }
  ;(d.fromDimensions = function (e) {
    const t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).dimensions,
      a = n.Cartesian3.multiplyByScalar(t, 0.5, new n.Cartesian3())
    return new d({
      minimum: n.Cartesian3.negate(a, new n.Cartesian3()),
      maximum: a,
      offsetAttribute: e.offsetAttribute,
    })
  }),
    (d.fromAxisAlignedBoundingBox = function (e) {
      return new d({ minimum: e.minimum, maximum: e.maximum })
    }),
    (d.packedLength = 2 * n.Cartesian3.packedLength + 1),
    (d.pack = function (e, t, a) {
      return (
        (a = r.defaultValue(a, 0)),
        n.Cartesian3.pack(e._min, t, a),
        n.Cartesian3.pack(e._max, t, a + n.Cartesian3.packedLength),
        (t[a + 2 * n.Cartesian3.packedLength] = r.defaultValue(e._offsetAttribute, -1)),
        t
      )
    })
  const p = new n.Cartesian3(),
    l = new n.Cartesian3(),
    y = { minimum: p, maximum: l, offsetAttribute: void 0 }
  return (
    (d.unpack = function (e, t, a) {
      t = r.defaultValue(t, 0)
      const i = n.Cartesian3.unpack(e, t, p),
        o = n.Cartesian3.unpack(e, t + n.Cartesian3.packedLength, l),
        u = e[t + 2 * n.Cartesian3.packedLength]
      return r.defined(a)
        ? ((a._min = n.Cartesian3.clone(i, a._min)),
          (a._max = n.Cartesian3.clone(o, a._max)),
          (a._offsetAttribute = -1 === u ? void 0 : u),
          a)
        : ((y.offsetAttribute = -1 === u ? void 0 : u), new d(y))
    }),
    (d.createGeometry = function (a) {
      const s = a._min,
        m = a._max
      if (n.Cartesian3.equals(s, m)) return
      const f = new u.GeometryAttributes(),
        d = new Uint16Array(24),
        p = new Float64Array(24)
      ;(p[0] = s.x),
        (p[1] = s.y),
        (p[2] = s.z),
        (p[3] = m.x),
        (p[4] = s.y),
        (p[5] = s.z),
        (p[6] = m.x),
        (p[7] = m.y),
        (p[8] = s.z),
        (p[9] = s.x),
        (p[10] = m.y),
        (p[11] = s.z),
        (p[12] = s.x),
        (p[13] = s.y),
        (p[14] = m.z),
        (p[15] = m.x),
        (p[16] = s.y),
        (p[17] = m.z),
        (p[18] = m.x),
        (p[19] = m.y),
        (p[20] = m.z),
        (p[21] = s.x),
        (p[22] = m.y),
        (p[23] = m.z),
        (f.position = new o.GeometryAttribute({
          componentDatatype: i.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: p,
        })),
        (d[0] = 4),
        (d[1] = 5),
        (d[2] = 5),
        (d[3] = 6),
        (d[4] = 6),
        (d[5] = 7),
        (d[6] = 7),
        (d[7] = 4),
        (d[8] = 0),
        (d[9] = 1),
        (d[10] = 1),
        (d[11] = 2),
        (d[12] = 2),
        (d[13] = 3),
        (d[14] = 3),
        (d[15] = 0),
        (d[16] = 0),
        (d[17] = 4),
        (d[18] = 1),
        (d[19] = 5),
        (d[20] = 2),
        (d[21] = 6),
        (d[22] = 3),
        (d[23] = 7)
      const l = n.Cartesian3.subtract(m, s, c),
        y = 0.5 * n.Cartesian3.magnitude(l)
      if (r.defined(a._offsetAttribute)) {
        const t = p.length,
          n = new Uint8Array(t / 3),
          r = a._offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1
        e.arrayFill(n, r),
          (f.applyOffset = new o.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: n,
          }))
      }
      return new o.Geometry({
        attributes: f,
        indices: d,
        primitiveType: o.PrimitiveType.LINES,
        boundingSphere: new t.BoundingSphere(n.Cartesian3.ZERO, y),
        offsetAttribute: a._offsetAttribute,
      })
    }),
    function (e, t) {
      return r.defined(t) && (e = d.unpack(e, t)), d.createGeometry(e)
    }
  )
})

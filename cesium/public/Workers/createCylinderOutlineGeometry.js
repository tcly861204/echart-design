define([
  './GeometryOffsetAttribute-8c5e10db',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './CylinderGeometryLibrary-76cda53e',
  './defaultValue-81eec7ed',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './IndexDatatype-f1dcdf35',
  './commonjsHelpers',
  './combine-3c023bda',
  './WebGLConstants-508b9636',
], function (t, e, i, n, o, r, a, s, u, f, d, c, l) {
  'use strict'
  const m = new i.Cartesian2()
  function b(t) {
    const e = (t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)).length,
      i = t.topRadius,
      n = t.bottomRadius,
      o = a.defaultValue(t.slices, 128),
      r = Math.max(a.defaultValue(t.numberOfVerticalLines, 16), 0)
    ;(this._length = e),
      (this._topRadius = i),
      (this._bottomRadius = n),
      (this._slices = o),
      (this._numberOfVerticalLines = r),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderOutlineGeometry')
  }
  ;(b.packedLength = 6),
    (b.pack = function (t, e, i) {
      return (
        (i = a.defaultValue(i, 0)),
        (e[i++] = t._length),
        (e[i++] = t._topRadius),
        (e[i++] = t._bottomRadius),
        (e[i++] = t._slices),
        (e[i++] = t._numberOfVerticalLines),
        (e[i] = a.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  const p = {
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0,
  }
  return (
    (b.unpack = function (t, e, i) {
      e = a.defaultValue(e, 0)
      const n = t[e++],
        o = t[e++],
        r = t[e++],
        s = t[e++],
        u = t[e++],
        f = t[e]
      return a.defined(i)
        ? ((i._length = n),
          (i._topRadius = o),
          (i._bottomRadius = r),
          (i._slices = s),
          (i._numberOfVerticalLines = u),
          (i._offsetAttribute = -1 === f ? void 0 : f),
          i)
        : ((p.length = n),
          (p.topRadius = o),
          (p.bottomRadius = r),
          (p.slices = s),
          (p.numberOfVerticalLines = u),
          (p.offsetAttribute = -1 === f ? void 0 : f),
          new b(p))
    }),
    (b.createGeometry = function (n) {
      let d = n._length
      const c = n._topRadius,
        l = n._bottomRadius,
        b = n._slices,
        p = n._numberOfVerticalLines
      if (d <= 0 || c < 0 || l < 0 || (0 === c && 0 === l)) return
      const y = 2 * b,
        _ = r.CylinderGeometryLibrary.computePositions(d, c, l, b, !1)
      let h,
        A = 2 * b
      if (p > 0) {
        const t = Math.min(p, b)
        ;(h = Math.round(b / t)), (A += t)
      }
      const R = f.IndexDatatype.createTypedArray(y, 2 * A)
      let G,
        O = 0
      for (G = 0; G < b - 1; G++)
        (R[O++] = G), (R[O++] = G + 1), (R[O++] = G + b), (R[O++] = G + 1 + b)
      if (((R[O++] = b - 1), (R[O++] = 0), (R[O++] = b + b - 1), (R[O++] = b), p > 0))
        for (G = 0; G < b; G += h) (R[O++] = G), (R[O++] = G + b)
      const V = new u.GeometryAttributes()
      ;(V.position = new s.GeometryAttribute({
        componentDatatype: o.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: _,
      })),
        (m.x = 0.5 * d),
        (m.y = Math.max(l, c))
      const L = new e.BoundingSphere(i.Cartesian3.ZERO, i.Cartesian2.magnitude(m))
      if (a.defined(n._offsetAttribute)) {
        d = _.length
        const e = new Uint8Array(d / 3),
          i = n._offsetAttribute === t.GeometryOffsetAttribute.NONE ? 0 : 1
        t.arrayFill(e, i),
          (V.applyOffset = new s.GeometryAttribute({
            componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: e,
          }))
      }
      return new s.Geometry({
        attributes: V,
        indices: R,
        primitiveType: s.PrimitiveType.LINES,
        boundingSphere: L,
        offsetAttribute: n._offsetAttribute,
      })
    }),
    function (t, e) {
      return a.defined(e) && (t = b.unpack(t, e)), b.createGeometry(t)
    }
  )
})

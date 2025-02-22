define([
  './defaultValue-81eec7ed',
  './PrimitivePipeline-3933e091',
  './createTaskProcessorWorker',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './ComponentDatatype-a15c9a19',
  './WebGLConstants-508b9636',
  './commonjsHelpers',
  './combine-3c023bda',
  './GeometryAttribute-64b853f6',
  './GeometryAttributes-32b29525',
  './GeometryPipeline-7ffd77ba',
  './AttributeCompression-80665726',
  './EncodedCartesian3-d9f5c4a4',
  './IndexDatatype-f1dcdf35',
  './IntersectionTests-bc78300e',
  './Plane-3f01019d',
  './WebMercatorProjection-79b3214e',
], function (e, t, r, n, o, i, s, a, c, f, u, d, m, b, l, p, y, P, k) {
  'use strict'
  const C = {}
  function G(t) {
    let r = C[t]
    return (
      e.defined(r) ||
        ('object' == typeof exports
          ? (C[r] = r = require(`Workers/${t}`))
          : require([`Workers/${t}`], function (e) {
              ;(r = e), (C[r] = e)
            })),
      r
    )
  }
  return r(function (r, n) {
    const o = r.subTasks,
      i = o.length,
      s = new Array(i)
    for (let t = 0; t < i; t++) {
      const r = o[t],
        n = r.geometry,
        i = r.moduleName
      if (e.defined(i)) {
        const e = G(i)
        s[t] = e(n, r.offset)
      } else s[t] = n
    }
    return Promise.all(s).then(function (e) {
      return t.PrimitivePipeline.packCreateGeometryResults(e, n)
    })
  })
})

define([
  './PrimitivePipeline-3933e091',
  './createTaskProcessorWorker',
  './Transforms-08771371',
  './Matrix2-47e98d76',
  './RuntimeError-8952249c',
  './defaultValue-81eec7ed',
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
], function (e, t, i, r, n, o, a, c, s, m, b, d, u, P, f, p, l, y, G) {
  'use strict'
  return t(function (t, i) {
    const r = e.PrimitivePipeline.unpackCombineGeometryParameters(t),
      n = e.PrimitivePipeline.combineGeometry(r)
    return e.PrimitivePipeline.packCombineGeometryResults(n, i)
  })
})

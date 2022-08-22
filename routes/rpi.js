var proxy = require('http-proxy-middleware')
var transformerProxy = require('transformer-proxy')


function transformerFunction(data, req, res) {
  console.log(data.toString()); return data
  var page = data.toString().replace(/href="\//g, 'href="/iot/')
  page = page.toString().replace(/src="\//g, 'src="/iot/')
  return new Buffer(page)
}

module.exports = function (app) {
  app.use(transformerProxy(transformerFunction))
  app.use('/auth', proxy({ target: 'http://localhost:9000', pathRewrite: { '^/auth': '/' }, changeOrigin: true, ws: true, logProvider: function () { return require('debug')('api-gateway:proxyLog') } }))
}

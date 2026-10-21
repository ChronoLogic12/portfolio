var SITE_HOST = '__SITE_HOST__'

function queryString(querystring) {
  var parts = []
  for (var key in querystring) {
    var entry = querystring[key]
    var values = entry.multiValue ? entry.multiValue : [entry]
    for (var i = 0; i < values.length; i++) parts.push(key + '=' + values[i].value)
  }
  return parts.length ? '?' + parts.join('&') : ''
}

function redirect(location) {
  return { statusCode: 301, statusDescription: 'Moved Permanently', headers: { location: { value: location } } }
}

function handler(event) {
  var request = event.request
  var uri = request.uri
  var host = request.headers.host ? request.headers.host.value : SITE_HOST

  if (host !== SITE_HOST) {
    return redirect('https://' + SITE_HOST + uri + queryString(request.querystring))
  }

  if (uri.length > 1 && uri.slice(-1) === '/') {
    return redirect(uri.slice(0, -1) + queryString(request.querystring))
  }

  if (uri === '/') {
    request.uri = '/index.html'
    return request
  }

  var lastSegment = uri.split('/').pop()
  if (lastSegment.indexOf('.') === -1) request.uri = uri + '/index.html'
  return request
}

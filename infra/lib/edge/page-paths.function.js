function queryString(querystring) {
  var parts = []
  for (var key in querystring) {
    var entry = querystring[key]
    var values = entry.multiValue ? entry.multiValue : [entry]
    for (var i = 0; i < values.length; i++) parts.push(key + '=' + values[i].value)
  }
  return parts.length ? '?' + parts.join('&') : ''
}

function handler(event) {
  var request = event.request
  var uri = request.uri

  if (uri.length > 1 && uri.slice(-1) === '/') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri.slice(0, -1) + queryString(request.querystring) } },
    }
  }

  if (uri === '/') {
    request.uri = '/index.html'
    return request
  }

  var lastSegment = uri.split('/').pop()
  if (lastSegment.indexOf('.') === -1) request.uri = uri + '/index.html'
  return request
}

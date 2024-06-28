const getLineHandler = require('./handler')

function parseSync (content, options) {
  if (typeof content !== 'string') {
    content = ''
  }

  const rootObj = {}
  const lineHandler = getLineHandler(rootObj, options)
  const lines = content.split(/\r?\n/u)

  lines.forEach(lineHandler)

  return rootObj
}

module.exports = parseSync

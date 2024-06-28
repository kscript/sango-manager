const {
  isCommentedOut,
  isSection,
  normalizeValue,
  normalizeListItem,
  getSectionName,
  extractFromWrapper
} = require('./utils')

function getLineHandler (rootObj, options) {
  let currentObj = rootObj
  let currentList = null
  options = options instanceof Object ? options : {}
  return (line) => {
    line = line.trim()

    if (!line || isCommentedOut(line)) return
    // [section]
    if (isSection(line)) {
      const sectionName = getSectionName(line)
      rootObj[sectionName] = rootObj[sectionName] || {}

      if (typeof options.parser === 'function') {
        const current = rootObj[sectionName]
        const data = options.parser(rootObj, currentObj, sectionName)
        currentObj = data instanceof Object ? data : current
      } else {
        currentObj = rootObj[sectionName]
      }
      return
    }

    const firstEqual = line.indexOf('=')

    // key= value/list
    if (firstEqual > 0) {
      const [key, rawValue] = getKeyValue(line, firstEqual)

      // List
      if (rawValue.startsWith('[')) {
        // single line list
        if (rawValue.endsWith(']')) {
          const value = extractFromWrapper(rawValue)
          const listItems = normalizeListItem(value)
          // const listItems = value.split(',').map(normalizeValue)
          currentObj[key] = listItems
        // multiline list
        } else {
          currentObj[key] = currentList = []
          const items = normalizeListItem(rawValue)
          items.forEach((item) => {
            item && currentList.push(item)
          })
        }
      } else {
        // key=value
        if (typeof options.parser === 'function') {
          options.parser(rootObj, currentObj, '', key, normalizeValue(rawValue))
        } else {
          currentObj[key] = normalizeValue(rawValue)
        }
      }
    // multiline item, with or without the closing bracket ]
    } else if (currentList) {
      if (line === ']') {
        currentList = null
      } else {
        // continue multiline list or an error
        currentList.push(...normalizeListItem(line))
      }
    }
  }
}

module.exports = getLineHandler

function getKeyValue (line, firstEqual) {
  // split once by equal
  const key = line.substr(0, firstEqual).trim()
  const value = line.substr(firstEqual + 1).trim()

  return [key, value]
}

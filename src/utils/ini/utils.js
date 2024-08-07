function isSection (line) {
  line = removeInlineComments(line)
  // e.g. [section]
  return isWrappedWith('[', line, ']')
}

function getSectionName (line) {
  line = removeInlineComments(line)

  // extract "text" out of "[text]"
  const text = extractFromWrapper(line).trim()

  if (isQuoted(text)) {
    // unquote
    return extractFromWrapper(text)
  }
  return text
}

function isWrappedWith (head, str, tail) {
  return str.startsWith(head) && str.endsWith(tail || head)
}

function isQuoted (str) {
  return isWrappedWith("'", str) || isWrappedWith('"', str)
}

function extractFromWrapper (str, wrapper) {
  const wrapLen = wrapper ? wrapper.length : 1

  return str.substr(wrapLen, str.length - 1 - wrapLen)
}

function isNumbersOnly (str) {
  const num = parseInt(str, 10)

  return String(num) === str
}

const BOOLEANS = ['true', 'false']

function isBooleanStr (str) {
  str = str.toLowerCase()

  return BOOLEANS.includes(str)
}
function getBoolean (str) {
  str = str.toLowerCase()

  if (str === BOOLEANS[0]) return true
  if (str === BOOLEANS[1]) return false
}

function isCommentedOut (line) {
  return line[0] === ';'
}

function normalizeValue (value) {
  value = removeInlineComments(value).trim()

  if (isQuoted(value)) {
    return extractFromWrapper(value)
  }

  if (isNumbersOnly(value)) {
    return parseInt(value, 10)
  }

  if (isBooleanStr(value)) {
    return getBoolean(value)
  }

  return value
}

const LIST_SIGNS = [',', ']']
function normalizeListItem (item) {
  item = removeInlineComments(item)

  let itemLen = item.length
  const firstChar = item[0]
  const lastChar = item[itemLen - 1]

  if (firstChar === '[') {
    item = item.substr(1).trimLeft()
    itemLen = item.length
  }

  if (LIST_SIGNS.includes(lastChar)) {
    item = item.substr(0, itemLen - 1)
  }

  let items = isQuoted(item) ? [item] : item.split(',')
  items = items
    .map(mapItem => normalizeValue(mapItem.trim()))
    .filter(filterItem => Boolean(filterItem))

  return items
}

const NONE = -1
const QUOTES = ['"', "'"]
const isQuoteMark = aChar => QUOTES.includes(aChar)

function removeInlineComments (str) {
  const lastSemiColon = str.lastIndexOf(';')

  if (lastSemiColon === NONE) return str

  const withoutLastSemicolon = str.substr(0, lastSemiColon).trimRight()
  const firstChar = withoutLastSemicolon[0]
  const lastChar = withoutLastSemicolon[withoutLastSemicolon.length - 1]

  if (isQuoteMark(firstChar)) {
    if (firstChar === lastChar) {
      return withoutLastSemicolon
    }
    return str
  }

  return withoutLastSemicolon
}

module.exports = {
  isSection,
  getSectionName,
  normalizeValue,
  normalizeListItem,
  isCommentedOut,
  isQuoted,
  extractFromWrapper,
  isBooleanStr,
  getBoolean,
  removeInlineComments
}

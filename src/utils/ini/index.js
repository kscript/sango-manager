import iconv from 'iconv-lite'
import decode from './decode'
const setValue = (current, key, value) => {
  if (/,/.test(value)) {
    value = value.replace(/\s/g, '').split(';').shift().split(',').map(v => v.trim())
    if (key === 'String') {
      key = value[0]
      value = value[1]
    }
  }
  current[key] = value
}
export const parser = (root, current, section, key, value) => {
  if (key) {
    if (current[key] !== undefined) {
      if (!Array.isArray(current[key])) {
        current[key] = [current[key], {}]
        setValue(current[key][1], key, value)
        return current
      }
    }
    if (Array.isArray(current)) {
      setValue(current[current.length - 1], key, value)
    } else if (current instanceof Object) {
      setValue(current, key, value)
    }
  } else {
    const newData = {}
    if (Array.isArray(root[section])) {
      root[section].push(newData)
      return newData
    } else if (root[section] instanceof Object) {
      if (Object.keys(root[section]).length) {
        root[section] = [current, newData]
        return newData
      }
    }
  }
}

export const parse = (content, { encoding, ...options } = {}) => {
  if (encoding) {
    content = [].concat(encoding).reduce((prev, item) => {
      return iconv.decode(prev, item)
    }, content)
  }
  return decode(content, Object.assign({ parser }, options))
}

export const parseIni = (buffer, options = { encoding: 'big5' }) => {
  return parse(new Uint8Array(buffer), options)
}
iconv.skipDecodeWarning = true

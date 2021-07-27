/**
 * Replace matched string (if found in total string) with valueToUse.
 * @param {Object} {matchToReplace, valueToUse}
 * @param {string} {}.matchToReplace - String to search in totalString.
 * @param {string} {}.valueToUse - Destination value for the replaced string.
 * @param {string} totalString - String where search for matchToReplace.
 * */
const replaceMatchedString = ({ matchToReplace, valueToUse }, totalString) => {
  return totalString.includes(matchToReplace) ? totalString.replace(matchToReplace, valueToUse) : totalString
}

/**
 * Map over object and return new Obj.
 * @param {function} fn - Function to apply to every element in obj.
 * @param {Object} obj - Object to map.
 * */
const mapObject = (fn, obj) => {
  let index = 0
  const keys = Object.keys(obj)
  const len = keys.length
  const willReturn = {}

  while (index < len) {
    const key = keys[index]
    willReturn[key] = fn(
      obj[key], key, obj
    )
    index++
  }
  return willReturn
}

/**
 * Return date x time ago based on type in ISO8601 standard.
 * @param {Date} date - date to convert.
 * @param {string} type - year | month.
 * */
const getFormattedPastDate = (date, type) => {
  const typeAgoMap = {
    year: date.setMonth(date.getMonth() - 12),
    month: date.setMonth(date.getMonth() - 1),
    default: date.setMonth(date.getMonth() - 12) // default year
  }

  const dateToReturn = new Date(typeAgoMap[type]) || new Date(typeAgoMap.default)
  return dateToReturn.toISOString().split('T')[0]
}

/**
 * Return if date is in ISO8601 standard.
 * @param {string} dateString - string date to check.
 * */
const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  return dateString.match(regEx) // valid format
}

module.exports = {
  replaceMatchedString,
  mapObject,
  getFormattedPastDate,
  isValidDate
}

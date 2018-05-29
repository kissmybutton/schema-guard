export function fromCamelCase(text: string) {
  return text.replace(/([a-z])([A-Z])/g, ' $1 $2')
}

export function isObject(obj: Object) {
  return obj instanceof Object && obj.constructor === Object
}

// check if argument is empty
export function isEmpty(value: any) {
  let result = false
  // convert undefined arguments to null
  if (typeof value === 'undefined') {
    value = null
  }

  if (
    typeof value === 'object' &&
    (value === null ||
      (value instanceof Array && (value || []).length === 0) ||
      (value instanceof Date && !Date.parse(value as any)) ||
      (isObject(value) && Object.keys(value).length === 0))
  ) {
    result = true
  } else if ((value + '').replace(/[\t\n ]/g, '') === '') {
    // convert to string to cover alphanumeric together
    // in one statement without causing errors
    result = true
  }

  return result
}

export function isNumber(value: any) {
  return !isEmpty(value) && isFinite(Number(value))
}

export function isInteger(value: any) {
  return !isEmpty(value) && Number.isInteger(Number(value))
}

export function isString(value: any) {
  return typeof value === 'string'
}

export function isValidCSSColor(color: string) {
  let rxValid = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\d%?,?\s*){2,3}(\d%?)\)|(rgb|hsl)a\((\d%?,\s*){3}(0?(\.\d)?|1)?\)/i

  return rxValid.test(color)
}

/**
 * All possible units in CSS. Used to recognise units when parsing tweens.
 */
export const Units = [
  '%',
  'px',
  'pt',
  'em',
  'rem',
  'ex',
  'ch',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'deg',
  'grad',
  'rad',
  'turn',
  's',
  'ms'
]

// This is the regex to match the units of the given text to split and validate.
export const splitNumberAndUnitsRegex = /(\d*\.?\d*)(.*)/

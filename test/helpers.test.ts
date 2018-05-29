import { isValidCSSColor } from '../src/helpers'

describe('isValidCSSColor', () => {
  it('should return true if the string is a valid CSS color', () => {
    let hex = '#ff0'
    let rgb = 'rgb(0, 0, 0)'
    let rgba = 'rgba(0%, 0%, 0%, 0.5)'
    let hsl = 'hsl(0, 0, 0)'
    let hsla = 'hsla(0, 0, 0, 0.5)'

    expect(isValidCSSColor(hex)).toEqual(true)
    expect(isValidCSSColor(rgb)).toEqual(true)
    expect(isValidCSSColor(rgba)).toEqual(true)
    expect(isValidCSSColor(hsl)).toEqual(true)
    expect(isValidCSSColor(hsla)).toEqual(true)
  })
  it('should return false if the string is an invalid CSS color', () => {
    let hex = '#ffg'
    let rgb = 'rgb(0, 0, 0,)'
    let rgba = 'rgba(0%, 0%, 0%, 1.5)'
    let hsl = 'hsl(0, 0, 0,)'
    let hsla = 'hsla(0, 0, 0, 1.5)'

    expect(isValidCSSColor(hex)).toEqual(false)
    expect(isValidCSSColor(rgb)).toEqual(false)
    expect(isValidCSSColor(rgba)).toEqual(false)
    expect(isValidCSSColor(hsl)).toEqual(false)
    expect(isValidCSSColor(hsla)).toEqual(false)
  })
})

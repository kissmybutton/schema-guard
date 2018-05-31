import { isColor } from '../src/helpers'

describe('isColor', () => {
  it('should return true if the given value is a valid color', () => {
    let hex = '#ff0'
    let rgb = 'rgb(0, 0, 0)'
    let rgba = 'rgba(0%, 0%, 0%, 0.5)'
    let hsl = 'hsl(0, 0, 0)'
    let hsla = 'hsla(0, 0, 0, 0.5)'

    expect(isColor(hex)).toEqual(true)
    expect(isColor(rgb)).toEqual(true)
    expect(isColor(rgba)).toEqual(true)
    expect(isColor(hsl)).toEqual(true)
    expect(isColor(hsla)).toEqual(true)
  })
  it('should return false if the given value is not a valid color', () => {
    let hex = '#ffg'
    let rgb = 'rgb(0, 0, 0,)'
    let rgba = 'rgba(0%, 0%, 0%, 1.5)'
    let hsl = 'hsl(0, 0, 0,)'
    let hsla = 'hsla(0, 0, 0, 1.5)'

    expect(isColor(hex)).toEqual(false)
    expect(isColor(rgb)).toEqual(false)
    expect(isColor(rgba)).toEqual(false)
    expect(isColor(hsl)).toEqual(false)
    expect(isColor(hsla)).toEqual(false)
  })
})

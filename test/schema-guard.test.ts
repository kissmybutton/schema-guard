import Validator from '../src/schema-guard'

describe('Schema-guard tests', () => {
  it('should not pass when value type doesnt match', () => {
    const tests = [
      {
        type: 'string',
        givenValue: 100
      },
      {
        type: 'string',
        givenValue: undefined
      },
      {
        type: 'string',
        givenValue: null
      },
      {
        type: 'string',
        givenValue: {}
      },
      {
        type: 'string',
        givenValue: []
      },
      {
        type: 'integer',
        givenValue: 100.1
      },
      {
        type: 'integer',
        givenValue: -10000.2
      },
      {
        type: 'integer',
        givenValue: null
      },
      {
        type: 'integer',
        givenValue: undefined
      },
      {
        type: 'integer',
        givenValue: []
      },
      {
        type: 'integer',
        givenValue: {}
      },
      {
        type: 'number',
        givenValue: null
      },
      {
        type: 'number',
        givenValue: undefined
      },
      {
        type: 'number',
        givenValue: []
      },
      {
        type: 'number',
        givenValue: {}
      },
      {
        type: 'color',
        givenValue: '#ffg'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0, 0, 15)'
      }
    ]

    for (let test of tests) {
      const config = {
        animated: {
          width: {
            type: test.type
          }
        }
      }
      let validator = new Validator(config.animated)

      const givenData = {
        animatedAttrs: {
          width: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeFalsy()
    }
  })

  it('should pass successfully when value is string', () => {
    const config = {
      animated: {
        width: {
          type: 'string'
        }
      }
    }
    let validator = new Validator(config.animated)
    const givenData = {
      animatedAttrs: {
        width: '100px'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when value is number', () => {
    const config = {
      animated: {
        width: {
          type: 'number'
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        width: 100
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when value is integer', () => {
    const config = {
      animated: {
        width: {
          type: 'integer'
        }
      }
    }
    let validator = new Validator(config.animated)
    const givenData = {
      animatedAttrs: {
        width: 100
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when given type color and value is string', () => {
    const tests = [
      {
        type: 'color',
        givenValue: '#ff0'
      },
      {
        type: 'color',
        givenValue: '#ff00'
      },
      {
        type: 'color',
        givenValue: '#ff00ff'
      },
      {
        type: 'color',
        givenValue: '#ff00ff00'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0, 0)'
      },
      {
        type: 'color',
        givenValue: 'rgb(10%, 10%, 10%)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0, 0, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'rgb(10%, 10%, 10%, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0, 0)'
      },
      {
        type: 'color',
        givenValue: 'rgba(10%, 10%, 10%)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0, 0, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'rgba(10%, 10%, 10%, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0, 0)'
      },
      {
        type: 'color',
        givenValue: 'hsl(10%, 10%, 10%)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0, 0, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'hsl(10%, 10%, 10%, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 0, 0)'
      },
      {
        type: 'color',
        givenValue: 'hsla(10%, 10%, 10%)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 0, 0, 0.1)'
      },
      {
        type: 'color',
        givenValue: 'hsla(10%, 10%, 10%, 0.1)'
      }
    ]

    for (let test of tests) {
      const config = {
        animated: {
          color: {
            type: test.type
          }
        }
      }

      let validator = new Validator(config.animated)

      const givenData = {
        animatedAttrs: {
          color: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should fail when given type is color and value is not a valid color', () => {
    const tests = [
      {
        type: 'color',
        givenValue: 'fff'
      },
      {
        type: 'color',
        givenValue: '#gg0'
      },
      {
        type: 'color',
        givenValue: '#gg00'
      },
      {
        type: 'color',
        givenValue: '#gg00ff'
      },
      {
        type: 'color',
        givenValue: '#gg00ff00'
      },
      {
        type: 'color',
        givenValue: 'rgb(0)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, )'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0 0 0)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0, 0,)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0, 10%)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 10%, 0, 1)'
      },
      {
        type: 'color',
        givenValue: 'rgb(0, 0, 0, 10)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, )'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0 0 0)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0, 0,)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 10%, 0, 1)'
      },
      {
        type: 'color',
        givenValue: 'rgba(0, 0, 0, 10)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, )'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0 0 0)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0, 0,)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0, 10%)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 10%, 0, 1)'
      },
      {
        type: 'color',
        givenValue: 'hsl(0, 0, 0, 10)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, )'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 0)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0 0 0)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 0, 0,)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 10%, 0, 1)'
      },
      {
        type: 'color',
        givenValue: 'hsla(0, 0, 0, 10)'
      }
    ]

    for (let test of tests) {
      const config = {
        animated: {
          color: {
            type: test.type
          }
        }
      }

      let validator = new Validator(config.animated)

      const givenData = {
        animatedAttrs: {
          color: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeFalsy()
    }
  })

  it('should show error when not given a value in required attribute', () => {
    const config = {
      name: {
        type: 'string',
        required: [true, 'is required']
      }
    }

    const values = {
      address: ''
    }

    const validator = new Validator(config)
    const result = validator.validate(values)

    expect(result.valid).toEqual(false)
    expect(result.errors.length).toEqual(1)
    expect(result.errors[0].message).toEqual('is required')
  })

  it('should not show error when not given a value for a non required attribute', () => {
    const config = {
      animated: {
        color: {
          type: 'color',
          required: [true, 'User phone number required']
        },
        color2: {
          type: 'color',
          required: [false, 'User phone number required']
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        color: '#ffffff'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)

    let validator2 = new Validator({})

    const givenData2 = {
      animatedAttrs: {
        color: '#ffffff'
      }
    }

    let validation2 = validator.validate(givenData2.animatedAttrs)

    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should show error when given a wrong value with custom validator', () => {
    const config = {
      animated: {
        color: {
          type: 'color',
          validate: {
            validator: function(v) {
              return /\d{4}/.test(v) // must be 4 digits
            },
            message: 'my custom message'
          },
          required: [true, 'Please provide color']
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        color: '#ffffff'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual('my custom message')
  })

  it('should pass when given a correct value with custom validator', () => {
    const config = {
      animated: {
        color: {
          type: 'color',
          validate: {
            validator: function(v) {
              return /#ffffff/.test(v)
            },
            message: 'Must be the color white'
          },
          required: [true, 'Please provide color']
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        color: '#ffffff'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass when having minimum value and given value is equal or bigger', () => {
    let tests = [
      {
        min: 1,
        givenValue: 1
      },
      {
        min: 1,
        givenValue: 2
      },
      {
        min: '1',
        givenValue: 2
      },
      {
        min: 1,
        givenValue: '2'
      },
      {
        min: '1',
        givenValue: '2'
      }
    ]
    for (let test of tests) {
      const config = {
        animated: {
          width: {
            type: 'number',
            minimum: test.min
          }
        }
      }
      let validator = new Validator(config.animated)

      const givenData = {
        animatedAttrs: {
          width: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should fail when given value is lower than the minimum value', () => {
    const config = {
      animated: {
        test: {
          type: 'number',
          minimum: 1
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        test: '0'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual(
      'The value of the property test is smaller that the minimum required. Minimum value: 1'
    )
  })

  it('should pass when having maximum value and given value is equal or smaller', () => {
    let tests = [
      {
        max: 1,
        givenValue: 1
      },
      {
        max: 2,
        givenValue: 1
      },
      {
        max: '2',
        givenValue: 2
      },
      {
        max: 2,
        givenValue: '1'
      },
      {
        max: '2',
        givenValue: '1'
      }
    ]
    for (let test of tests) {
      const config = {
        animated: {
          width: {
            type: 'number',
            minimum: test.min
          }
        }
      }
      let validator = new Validator(config.animated)
      const givenData = {
        animatedAttrs: {
          width: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should fail when given value is bigger than the maximum value', () => {
    const config = {
      animated: {
        test: {
          type: 'number',
          maximum: 1
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        test: '2'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual(
      'The value of the property test is bigger that the maximum required. Maximum value: 1'
    )
  })

  it("should fail when given unit doesn't exist in the configuration", () => {
    const config = {
      animated: {
        test: {
          type: 'string',
          units: {
            enum: ['px', '%']
          }
        }
      }
    }
    let validator = new Validator(config.animated)

    const givenData = {
      animatedAttrs: {
        test: '2pc'
      }
    }

    let validation = validator.validate(givenData.animatedAttrs)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual("The attribute test doesn't allow 'pc' as units")
  })

  it('should pass when given unit exists in the configuration', () => {
    let tests = [
      {
        units: {
          enum: ['px', '%']
        },
        givenValue: '100px'
      },
      {
        units: {
          enum: ['px', '%']
        },
        givenValue: '100.2px'
      },
      {
        units: {
          enum: ['px', '%']
        },
        givenValue: '0.01px'
      },
      {
        units: {
          enum: ['px', '%']
        },
        givenValue: '20000%'
      },
      {
        units: {
          enum: ['px', '%', '']
        },
        givenValue: '1'
      }
    ]
    for (let test of tests) {
      const config = {
        animated: {
          width: {
            type: 'string',
            units: test.units
          }
        }
      }
      let validator = new Validator(config.animated)

      const givenData = {
        animatedAttrs: {
          width: test.givenValue
        }
      }

      let validation = validator.validate(givenData.animatedAttrs)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should return both attribute and relation errors', () => {
    const config = {
      address: {
        type: 'string',
        validate: {
          validator: function(value) {
            return value !== ''
          },
          message: 'cannot be blank'
        }
      },
      name: {
        type: 'string',
        required: [true, 'is required']
      }
    }

    const values = {
      address: ''
    }

    const validator = new Validator(config)
    const result = validator.validate(values)

    expect(result.valid).toEqual(false)
    expect(result.errors.length).toEqual(2)
  })
})

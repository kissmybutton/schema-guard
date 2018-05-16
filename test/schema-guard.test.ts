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
      }
    ]

    for (let test of tests) {
      const config = { type: test.type }
      let validator = new Validator(config)

      const givenData = test.givenValue

      let validation = validator.validate(givenData)
      expect(validation.valid).toBeFalsy()
    }
  })

  it('should pass successfully when value is string', () => {
    const config = { type: 'string' }
    let validator = new Validator(config)
    const givenData = '100px'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when value is number', () => {
    const config = { type: 'number' }
    let validator = new Validator(config)

    const givenData = 100

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when value is integer', () => {
    const config = { type: 'integer' }
    let validator = new Validator(config)
    const givenData = 100

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  it('should pass successfully when given type color and value is string', () => {
    const config = { type: 'color' }
    let validator = new Validator(config)

    const givenData = '#ffffff'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
  })

  // it('should show error when not given a value in required attribute', () => {
  //   const config = {
  //       type: 'color',
  //       required: [true, 'User phone number required']
  //   }
  //   let validator = new Validator(config)

  //   const givenData = '#ffffff'

  //   let validation = validator.validate(givenData)
  //   expect(validation.valid).toBeFalsy()
  //   expect(validation.errors[0].message).toEqual('User phone number required')
  // })

  // it('should not show error when not given a value for a non required attribute', () => {
  //   const config = {
  //     animated: {
  //       type: 'object',
  //       schema: {
  //         color: {
  //             type: 'color',
  //             required: [true, 'User phone number required']
  //           },
  //           color2: {
  //             type: 'color',
  //             required: [false, 'User phone number required']
  //           }
  //         }
  //       }
  //   }
  //   let validator = new Validator(config.animated)

  //   const givenData = {
  //     animatedAttrs: {
  //       color: '#ffffff'
  //     }
  //   }

  //   let validation = validator.validate(givenData.animatedAttrs)
  //   expect(validation.valid).toBeTruthy()
  //   expect(validation.errors.length).toEqual(0)
  // })

  it('should show error when given a wrong value with custom validator', () => {
    const config = {
      type: 'color',
      validate: {
        validator: function(v) {
          return /\d{4}/.test(v) // must be 4 digits
        },
        message: 'my custom message'
      },
      required: [true, 'Please provide color']
    }
    let validator = new Validator(config)

    const givenData = '#ffffff'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual('my custom message')
  })

  it('should pass when given a correct value with custom validator', () => {
    const config = {
      type: 'color',
      validate: {
        validator: function(v) {
          return /\d{4}/.test(v) // must be at least 4 digits
        },
        message: 'my custom message'
      },
      required: [true, 'Please provide color']
    }
    let validator = new Validator(config)

    const givenData = '55552'

    let validation = validator.validate(givenData)
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
        type: 'number',
        minimum: test.min
      }
      let validator = new Validator(config)

      const givenData = test.givenValue

      let validation = validator.validate(givenData)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should fail when given value is lower than the minimum value', () => {
    const config = {
      type: 'number',
      minimum: 1
    }
    let validator = new Validator(config)

    const givenData = '0'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual(
      'The value of the property provided attribute is smaller that the minimum required. Minimum value: 1'
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
        type: 'number',
        minimum: test.min
      }
      let validator = new Validator(config)
      const givenData = test.givenValue

      let validation = validator.validate(givenData)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })

  it('should fail when given value is bigger than the maximum value', () => {
    const config = {
      type: 'number',
      maximum: 1
    }
    let validator = new Validator(config)

    const givenData = '2'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual(
      'The value of the property provided attribute is bigger that the maximum required. Maximum value: 1'
    )
  })

  it("should fail when given unit doesn't exist in the configuration", () => {
    const config = {
      type: 'string',
      units: {
        enum: ['px', '%']
      }
    }
    let validator = new Validator(config)

    const givenData = '2pc'

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeFalsy()
    expect(validation.errors[0].message).toEqual(
      "The attribute provided attribute doesn't allow 'pc' as units"
    )
  })

  it('should fail when require fields are missing', () => {
    const config = {
      type: 'object',
      schema: {
        width: {
          type: 'string',
          required: [true, 'width is mandatory']
        },
        height: {
          type: 'string'
        }
      }
    }
    let validator = new Validator(config)

    const givenData = {
      height: '100px'
    }

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeFalsy()
    // expect(validation.errors[0].message).toEqual("The attribute provided attribute doesn't allow 'pc' as units")
  })

  it('should pass when given unit exists in the configuration', () => {
    const config = {
      type: 'object',
      schema: {
        width: {
          type: 'string'
        },
        height: {
          type: 'string'
        },
        subobject: {
          type: 'object',
          schema: {
            subwidth: {
              type: 'string'
            }
          }
        }
      }
    }

    let validator = new Validator(config)

    const givenData = {
      width: 'alpha',
      height: 'beta',
      subobject: {
        subwidth: 'gamma'
      }
    }

    let validation = validator.validate(givenData)
    expect(validation.valid).toBeTruthy()
    expect(validation.errors.length).toEqual(0)
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
        type: 'string',
        units: test.units
      }
      let validator = new Validator(config)

      const givenData = test.givenValue

      let validation = validator.validate(givenData)
      expect(validation.valid).toBeTruthy()
      expect(validation.errors.length).toEqual(0)
    }
  })
})

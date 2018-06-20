import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import ValidationResult from '../classes/ValidationResult'
import { fromCamelCase } from '../helpers'
import { AttributeConfig } from '../interfaces/AttributeConfig'

export default class NumberAttributeValidator implements AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()
    if (attributeConfig.minimum) {
      let val = Number(value)
      let min = Number(attributeConfig.minimum)
      if (val < min) {
        validated.addError({
          message: `The value of the property ${fromCamelCase(
            attribute
          )} is smaller that the minimum required. Minimum value: ${min}`,
          property: attribute
        })
      }
    }
    if (attributeConfig.maximum) {
      let val = Number(value)
      let max = Number(attributeConfig.maximum)
      if (val > max) {
        validated.addError({
          message: `The value of the property ${fromCamelCase(
            attribute
          )} is bigger that the maximum required. Maximum value: ${max}`,
          property: attribute
        })
      }
    }

    return validated
  }
}

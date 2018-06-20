import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import { AttributeConfig } from '../interfaces/AttributeConfig'
import ValidationResult from '../classes/ValidationResult'
import { fromCamelCase, isColor } from '../helpers'

export default class ColorAttributeValidator implements AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()

    if (!isColor(value)) {
      validated.addError({
        message: `The value ${value} of the property ${fromCamelCase(
          attribute
        )} is not a valid color`,
        property: attribute
      })
    }

    return validated
  }
}

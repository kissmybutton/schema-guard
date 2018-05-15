import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import { AttributeConfig } from '../interfaces/AttributeConfig'
import ValidationResult from '../classes/ValidationResult'

export default class ColorAttributeValidator implements AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()

    return validated
  }
}

import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import ValidationResult from '../classes/ValidationResult'
import { splitNumberAndUnitsRegex } from '../helpers'
import { AttributeConfig } from '../interfaces/AttributeConfig'

export default class StringAttributeValidator implements AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()
    let result = this.validateUnits(attribute, value, attributeConfig)
    if (!result.valid) {
      validated.addError({ message: result.errors[0].message, property: attribute })
    }

    return validated
  }

  private validateUnits(attribute: string, value: string, config: any) {
    let validated = new ValidationResult()
    if (!config.units) {
      return validated
    }

    let splitNumberAndUnits = value.match(splitNumberAndUnitsRegex) as string[]

    if (config.units.enum.indexOf(splitNumberAndUnits[2]) === -1) {
      validated.addError({
        message: `The attribute ${attribute} doesn't allow '${splitNumberAndUnits[2]}' as units`,
        property: attribute
      })
    }

    return validated
  }
}

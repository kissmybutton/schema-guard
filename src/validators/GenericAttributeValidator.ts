import ValidationResult from '../classes/ValidationResult'
import { fromCamelCase, isInteger, isNumber, isObject, isString } from '../helpers'
import { AttributeConfig } from '../interfaces/AttributeConfig'
import { BasicAttributeDictionary } from '../interfaces/BasicAttributeDictionary'

/**
 * Validator class for the primitive types. This is used for the first step before
 * using our custom validators to prevent unecessary computations.
 * We just call the validate method and return the result
 */
export default class BasicAttributeValidator {
  private basicAttributeValidations: BasicAttributeDictionary = {
    number: (val: any) => isNumber(val),
    integer: (val: any) => isInteger(val),
    string: (val: any) => isString(val),
    color: (val: any) => isString(val),
    object: (val: any) => isObject(val)
  }

  /**
   * This method validates the type of the given variable based on the configuration given.
   * If the value isn't of that type then we add an error and return the result.
   * @param {string} attribute The attribute name
   * @param {string} value The value
   * @param {AttributeConfig} attributeConfig The attribute configuration
   * @returns {ValidationResult} The validation result object
   */
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()
    let hasValidType = this.basicAttributeValidations[attributeConfig.type](value)
    if (!hasValidType) {
      validated.addError({
        message: `The value of the property ${fromCamelCase(
          attribute
        )} is different that the defined: ${attributeConfig.type}`,
        property: attribute
      })
    }
    return validated
  }
}

import AbstractAttributeValidatorFactory from '../interfaces/AbstractAttributeValidatorFactory'
import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import NumberAttributeValidator from '../validators/NumberAttributeValidator'
import StringAttributeValidator from '../validators/StringAttributeValidator'
import ColorAttributeValidator from '../validators/ColorAttributeValidator'
import ObjectAttributeValidator from '../validators/ObjectAttributeValidator'

/**
 * Our Validator factory. Uses factory pattern to generate individual validators based on the given type
 */
export class AttributeValidatorFactory implements AbstractAttributeValidatorFactory {
  /**
   * The static method of the factory. Returns null if the validator for the given type is not found.
   * @param {string} type The type of the attribute
   * @returns {AbstractAttributeValidator | null} A validator or null
   */
  static createValidator(type: string): AbstractAttributeValidator | null {
    if (type === 'number' || type === 'integer') {
      return new NumberAttributeValidator()
    } else if (type === 'string') {
      return new StringAttributeValidator()
    } else if (type === 'color') {
      return new ColorAttributeValidator()
    } else if (type === 'object') {
      return new ObjectAttributeValidator()
    }

    return null
  }
}

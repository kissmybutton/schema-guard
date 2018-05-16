import ValidationResult from './classes/ValidationResult'
import GenericAttributeValidator from './validators/GenericAttributeValidator'
import { AttributeValidatorFactory } from './factories/AttributeValidatorFactory'
import { AttributeConfig } from './interfaces/AttributeConfig'

export default class SchemaGuard {
  private config: any
  private basicAttributeValidator = new GenericAttributeValidator()

  constructor(conf: AttributeConfig) {
    this.config = conf
  }

  /**
   * This is our only exposed method.
   * @param {AttributeConfig} values The given values
   * @returns {ValidationResult} The validation result.
   */
  public validate(value) {
    if (!value) {
      throw new Error('Please supply the value')
    }

    return this.validateValue(value)
  }

  /**
   * Validate each value based on its configuration
   * @param {string} value The given value
   * @param {string} attribute The given attribute
   * @returns {ValidationResult} The validation result
   */
  private validateValue(value: string) {
    let attributeConfig = this.config
    let basicValidation = this.basicAttributeValidator.validate(
      'provided attribute',
      value,
      attributeConfig
    )

    if (!basicValidation.valid) {
      return basicValidation
    }

    let validator = AttributeValidatorFactory.createValidator(attributeConfig.type)

    if (validator === null) {
      return basicValidation
    }

    let validated = validator.validate('provided attribute', value, attributeConfig)

    if (!validated.valid) {
      return validated
    }

    this.handleCustomValidation(value, validated, attributeConfig)

    return validated
  }

  /**
   * After the validations we check for the custom validation
   * functionality that we support. The user can configure a key which is called "validate".
   * This key has as value an object with 2 keys:
   * 1) validator which is a custom function
   * 2) message which is the custom message to show if the check fails
   * @param {string} value The value
   * @param {ValidationResult} validated The validation result reference
   * @param attributeConfig The configuration
   */
  private handleCustomValidation(value: string, validated: ValidationResult, attributeConfig: any) {
    let hasValidCustomValidators = true
    if (
      attributeConfig.validate &&
      attributeConfig.validate.validator &&
      typeof attributeConfig.validate.validator === 'function'
    ) {
      hasValidCustomValidators = attributeConfig.validate.validator(value)
      if (!hasValidCustomValidators) {
        validated.addError(attributeConfig.validate.message)
      }
    }
  }
}

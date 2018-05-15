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
  public validate(values: AttributeConfig) {
    if (!values) {
      throw new Error('Please supply the configuration object')
    }

    const relationValidation = this.validateOneToOneRelation(values)

    if (!relationValidation.valid) {
      return relationValidation
    }

    return this.validateAttributes(values)
  }

  /**
   * Validate each value based on its configuration
   * @param {string} value The given value
   * @param {string} attribute The given attribute
   * @returns {ValidationResult} The validation result
   */
  private validateValue(value: string, attribute: string) {
    let attributeConfig = this.config[attribute]
    let basicValidation = this.basicAttributeValidator.validate(
      attribute,
      value,
      this.config[attribute]
    )

    if (!basicValidation.valid) {
      return basicValidation
    }

    let validator = AttributeValidatorFactory.createValidator(attributeConfig.type)

    if (validator === null) {
      return basicValidation
    }

    let validated = validator.validate(attribute, value, attributeConfig)

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

  /**
   * This method iterates through all attributes and validates the value based on the
   * configuration. Throws a hard error if the type property doesn't exist since its mandatory
   * @param {AttributeConfig} attributes The list of attributes in object [key,value] pair format.
   * @returns {ValidationResult} The validation result
   */
  private validateAttributes(attributes: AttributeConfig) {
    let validated = new ValidationResult()

    for (const key of Object.keys(attributes)) {
      if (this.config[key].type === undefined) {
        throw new Error(`Please provide a type property for attribute ${key}`)
      }

      let isValidFromValue = this.validateValue(attributes[key], key)
      if (!isValidFromValue.valid) {
        validated.addError(isValidFromValue.errors[0].message)
      }
    }
    return validated
  }

  /**
   * This method validates the one to one relation between given attributes and
   * the existing configuration attributes. Generally they should exist both ways, unless specified
   * by the "required" attribute.
   * Required attribute follow the mongoose Schema like way, and is an array with the first parameter being
   * true/false and the second one the error message
   * @param values { AttributeConfig}  The given values
   * @returns {ValidationResult} The validation result
   */
  private validateOneToOneRelation(values: AttributeConfig) {
    let validated = new ValidationResult()

    for (const key of Object.keys(this.config)) {
      if (values[key] === undefined && this.config[key].required && this.config[key].required[0]) {
        validated.addError(this.config[key].required[1])
        break
      }
    }

    return validated
  }
}

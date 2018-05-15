import ValidationError from './ValidationError'

/**
 * Our validation result class.
 * Each validator is using this class to generate proper result format
 * for the user
 */
export default class ValidationResult {
  public errors: ValidationError[]

  constructor() {
    this.errors = []
  }

  get valid() {
    return this.errors.length === 0
  }

  addError(message: string) {
    if (!message) throw new Error('Missing error message')
    const error = new ValidationError(message)
    this.errors.push(error)
    return error
  }
}

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

  addError(error: ValidationError) {
    if (!error.message) throw new Error('Missing error message!')

    const err = new ValidationError(error)

    this.errors.push(err)

    return err
  }
}

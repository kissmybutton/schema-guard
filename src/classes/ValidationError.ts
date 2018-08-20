/**
 * Our Error class.
 * Takes the error object as parameter in the constructor
 * TODO expand this for more detail.
 */
export default class ValidationError {
  public message: string
  public property: string

  constructor(error: ValidationError) {
    this.message = error.message
    this.property = error.property
  }
}

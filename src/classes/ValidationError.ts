/**
 * Our Error class.
 * Takes the message as parameter in the constructor
 * TODO expand this for more detail.
 */
export default class ValidationError {
  public message: string

  constructor(message: string) {
    this.message = message
  }
}

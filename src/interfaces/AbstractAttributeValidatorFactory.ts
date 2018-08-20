import { AbstractAttributeValidator } from './AbstractAttributeValidator'

export default abstract class AbstractAttributeValidatorFactory {
  static createValidator(type: string): AbstractAttributeValidator | null {
    return null
  }
}

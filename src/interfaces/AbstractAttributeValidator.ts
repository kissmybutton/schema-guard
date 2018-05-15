import ValidationResult from '../classes/ValidationResult'
import { AttributeConfig } from './AttributeConfig'

export interface AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult
}

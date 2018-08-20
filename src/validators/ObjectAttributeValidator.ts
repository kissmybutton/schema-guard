import { AbstractAttributeValidator } from '../interfaces/AbstractAttributeValidator'
import ValidationResult from '../classes/ValidationResult'
import { fromCamelCase, splitNumberAndUnitsRegex } from '../helpers'
import { AttributeConfig } from '../interfaces/AttributeConfig'

export default class ObjectAttributeValidator implements AbstractAttributeValidator {
  validate(attribute: string, value: string, attributeConfig: AttributeConfig): ValidationResult {
    let validated = new ValidationResult()

    // let result = this.validateObjectKeys(attribute, value, attributeConfig);
    // if (!result.valid) {
    //   validated.addError(result.errors[0].message);
    // }

    return validated
  }
  // validateObjectKeys(attribute: string, value: string, config: any) {
  //   let validated = new ValidationResult();
  //   if (!config.units) {
  //     return validated;
  //   }
  //
  //   let splitNumberAndUnits = value.match(splitNumberAndUnitsRegex) as string[];
  //
  //   if (config.units.enum.indexOf(splitNumberAndUnits[2]) === -1) {
  //     validated.addError(
  //       `The attribute ${attribute} doesn't allow '${
  //         splitNumberAndUnits[2]
  //         }' as units`
  //     );
  //   }
  //
  //   return validated;
  // }
}

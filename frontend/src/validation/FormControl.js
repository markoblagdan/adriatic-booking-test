import { ValidationFunctionWithErrorMessage } from "./ValidationFunctionWithError";

/** Class representing a form input. */
export class FormControl {
  /**
   *
   * @param {string} name
   * @param {"text" | "email" | "number" |"date"} type
   * @param {string} label
   * @param {ValidationFunctionWithErrorMessage[]} validationFunctionsWithErrorMessages
   * @param {string | number} value
   */
  constructor(
    name,
    type,
    label,
    validationFunctionsWithErrorMessages,
    value = ""
  ) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.validationFunctionsWithErrorMessages =
      validationFunctionsWithErrorMessages;
    this.value = value;

    // TODO: add support for multiple errors on formControl
    this.validationError = null;
  }

  validate() {
    for (const validationFunctionWithErrorMessage of this
      .validationFunctionsWithErrorMessages) {
      validationFunctionWithErrorMessage.validationFunction(
        this,
        validationFunctionWithErrorMessage.errorMessage
      );

      if (this.validationError) {
        break;
      }
    }
  }
}

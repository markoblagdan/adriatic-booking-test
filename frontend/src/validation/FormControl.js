import { ValidationFunctionWithErrorMessage } from "./ValidationFunctionWithError";

/** Class representing a form input. */
export class FormControl {
  /**
   *
   * @param {string} name
   * @param {string} label
   * @param {ValidationFunctionWithErrorMessage[]} validationFunctionsWithErrorMessages
   * @param {string | number} value
   */
  constructor(name, label, validationFunctionsWithErrorMessages, value = "") {
    this.label = label;
    this.name = name;
    this.validationFunctionsWithErrorMessages =
      validationFunctionsWithErrorMessages;
    this.value = value;

    // TODO: add support for multiple errors on formControl
    this.validationError = null;
  }

  validate() {
    this.validationFunctionsWithErrorMessages.forEach(
      (validationFunctionWithErrorMessage) => {
        validationFunctionWithErrorMessage.validationFunction(
          this,
          validationFunctionWithErrorMessage.errorMessage
        );
      }
    );
  }
}

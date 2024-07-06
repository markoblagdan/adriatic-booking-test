/** Class for wrapping a validation function with a custom error message. */
export class ValidationFunctionWithErrorMessage {
  /**
   *
   * @param {Function} validationFunction
   * @param {string} errorMessage
   */
  constructor(validationFunction, errorMessage) {
    this.validationFunction = validationFunction;
    this.errorMessage = errorMessage;
  }
}

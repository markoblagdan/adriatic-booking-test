/**
 *
 * @param {FormControl} formControl
 */
export function isPositiveNumber(formControl, errorMessage) {
  if (!formControl) {
    throw Error(
      "No control object provided to isPositiveNumber validation function."
    );
  }

  if (isNaN(formControl.value) || formControl.value <= 0) {
    formControl.validationError = errorMessage;
  }
}

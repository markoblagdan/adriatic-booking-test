/**
 *
 * @param {FormControl} formControl
 */
export function isPositiveNumber(formControl) {
  if (!formControl) {
    throw Error(
      "No control object provided to isPositiveNumber validation function."
    );
  }

  if (!/\S+@\S+\.\S+/.test(formControl.value)) {
    formControl.validationError = VALIDATION_ERRORS.EMAIL;
  }
}

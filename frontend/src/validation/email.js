import { FormControl } from "./FormControl";
import { VALIDATION_ERRORS } from "./validationErrors";

/**
 *
 * @param {FormControl} formControl
 */
export function email(formControl, errorMessage) {
  if (!formControl) {
    throw Error("No control object provided to email validation function.");
  }

  if (!/\S+@\S+\.\S+/.test(formControl.value)) {
    formControl.validationError = errorMessage;
  }
}

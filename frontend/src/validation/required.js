import { FormControl } from "./FormControl";
import { VALIDATION_ERRORS } from "./validationErrors";

/**
 *
 * @param {FormControl} formControl
 */
export const required = (formControl, errorMessage) => {
  if (!formControl) {
    throw Error("No control object provided to required validation function.");
  }

  if (
    formControl.value === null ||
    formControl.value === undefined ||
    formControl.value === ""
  ) {
    formControl.validationError = errorMessage;
  } else {
    formControl.validationError = null;
  }
};

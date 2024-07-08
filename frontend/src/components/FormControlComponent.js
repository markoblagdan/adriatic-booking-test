import { FormControl } from "../validation";

/**
 * A form input component.
 *
 * @component
 * @param {Object} props - The component accepts children and inputObject props.
 * @param {JSX} children - The passed in JSX of a specific control, such as <input type="text" />.
 * @param {FormControl} props.inputObject - The form control object.
 * @param {function} props.handleInputChange - The change event handler.
 * @returns {JSX.Element} The rendered button component.
 */
export default function FormControlComponent({ children, inputObject }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {inputObject.label}
      </label>
      {children}
      {inputObject.validationError && (
        <p className="text-red-500 text-xs mt-2">
          {inputObject.validationError}
        </p>
      )}
    </div>
  );
}

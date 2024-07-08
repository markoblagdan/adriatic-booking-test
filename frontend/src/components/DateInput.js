import { FormControl } from "../validation";

/**
 * A date input component.
 *
 * @component
 * @param {Object} props - The component accepts inputObject, handleInputChange and inputClassNames props.
 * @param {FormControl} props.inputObject - The form control object.
 * @param {function} props.handleInputChange - The change event handler.
 * @param {string} props.inputClassNames - The CSS classes for the input node.
 * @returns {JSX.Element} The rendered input component.
 */
export default function DateInput({
  inputObject,
  handleInputChange,
  inputClassNames,
}) {
  // Important to use format 'yyyy-m-d' for the native input type="date"
  const minDateString = "2024-01-01";
  const maxDateString = "2024-12-31";

  return (
    <input
      type="date"
      min={minDateString}
      max={maxDateString}
      name={inputObject.name}
      value={inputObject.value}
      onChange={handleInputChange}
      className={inputClassNames}
    />
  );
}

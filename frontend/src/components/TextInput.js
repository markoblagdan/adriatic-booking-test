import { FormControl } from "../validation";

/**
 * A text input component.
 *
 * @component
 * @param {Object} props - The component accepts inputObject, handleInputChange and inputClassNames props.
 * @param {FormControl} props.inputObject - The form control object.
 * @param {function} props.handleInputChange - The change event handler.
 * @param {string} props.inputClassNames - The CSS classes for the input node.
 * @returns {JSX.Element} The rendered input component.
 */
export default function TextInput({
  inputObject,
  handleInputChange,
  inputClassNames,
}) {
  return (
    <input
      type="text"
      name={inputObject.name}
      value={inputObject.value}
      onChange={handleInputChange}
      className={inputClassNames}
    />
  );
}

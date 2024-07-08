import { FormControl } from "../validation";

/**
 * An email input component.
 *
 * @component
 * @param {Object} props - The component accepts label, inputObject and handleInputChange props.
 * @param {FormControl} props.inputObject - The form control object.
 * @param {function} props.handleInputChange - The change event handler.
 * @param {string} props.inputClassNames - The CSS classes for the input node.
 * @returns {JSX.Element} The rendered input component.
 */
export default function EmailInput({
  inputObject,
  handleInputChange,
  inputClassNames,
}) {
  return (
    <input
      type="email"
      name={inputObject.name}
      value={inputObject.value}
      onChange={handleInputChange}
      className={inputClassNames}
    />
  );
}

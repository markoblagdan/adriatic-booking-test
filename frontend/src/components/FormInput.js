import { FormControl } from "../validation";

/**
 * A form input component.
 *
 * @component
 * @param {Object} props - The component accepts label, inputObject and handleInputChange props.
 * @param {FormControl} props.inputObject - The form control object.
 * @param {function} props.handleInputChange - The change event handler.
 * @returns {JSX.Element} The rendered button component.
 */
export default function FormInput({ inputObject, handleInputChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {inputObject.label}
      </label>
      <input
        type="text"
        name={inputObject.name}
        value={inputObject.value}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {inputObject.validationError && (
        <p className="text-red-500 text-xs mt-2">
          {inputObject.validationError}
        </p>
      )}
    </div>
  );
}

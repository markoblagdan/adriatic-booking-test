import { useEffect, useState } from "react";
import { calculateBookingPrice, saveBooking } from "../api";
import {
  FormControl,
  ValidationFunctionWithErrorMessage,
  required,
  email,
} from "../validation";
import FormControlComponent from "./FormControlComponent";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import EmailInput from "./EmailInput";
import NumberInput from "./NumberInput";
import { isPositiveNumber } from "../validation/isPositiveNumber";

export const BookingForm = ({ apartment }) => {
  const [booking, setBooking] = setupBookingFormControls();
  const [apiSuccessMessage, setApiSuccessMessage] = useState(null);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(null);

  // TODO: ugly workaround because of using classes in state ends up in this and having to access individual form controls via array notation. Array had to be used for the booking state var for simplicity of, but then no object keys for easy access are available. Object could not be used because of problems with doing clones of ES classes that are properties of an object, or cloning a parent class that contains all the children
  const checkInDate = booking[2];
  const checkOutDate = booking[3];

  useEffect(() => {
    const callCalculateBooking = async () => {
      const bookingPriceWrapper = await calculateBookingPrice(apartment.id, {
        startDate: checkInDate.value,
        endDate: checkOutDate.value,
      });

      setBookingPrice(bookingPriceWrapper.bookingPrice);
    };

    if (checkInDate.value && checkOutDate.value) {
      callCalculateBooking();
    }
  }, [checkInDate.value, checkOutDate.value]);

  const validate = () => {
    let formHasErrors = false;

    setBooking(
      booking.map((bookingInputObject) => {
        bookingInputObject.validate();
        if (bookingInputObject.validationError) formHasErrors = true;

        return bookingInputObject;
      })
    );

    return !formHasErrors;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "numberOfGuests") {
      value = parseInt(value);
    }

    setBooking(
      booking.map((bookingInputObject) => {
        if (bookingInputObject.name === name) {
          bookingInputObject.value = value;
        }

        return bookingInputObject;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      saveBooking({
        id: null,
        apartmentId: apartment.id,
        guestName: booking[0].value,
        guestEmail: booking[1].value,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        numberOfGuests: booking[4].value,
      }).then(
        () => {
          setApiSuccessMessage("Booking successfully saved!");
          setApiErrorMessage(null);
        },
        (error) => {
          setApiSuccessMessage(null);
          if (error && error.message) {
            setApiErrorMessage(error.message);
          }
        }
      );
    }
  };

  const inputClassNames =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="p-6 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      {booking.map((bookingInputObject, index) => (
        <FormControlComponent key={index} inputObject={bookingInputObject}>
          {getInputComponent(bookingInputObject, handleChange, inputClassNames)}
        </FormControlComponent>
      ))}
      {bookingPrice > 0 && (
        <p className="max-w-64">
          Booking price for check in date {booking.checkInDate} and check out
          date {booking.checkOutDate}: <b>{bookingPrice} EUR</b>
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Book Apartment
      </button>
      {apiSuccessMessage && (
        <p className="text-green-500 font-bold">{apiSuccessMessage}</p>
      )}
      {apiErrorMessage && (
        <p className="text-red-500 font-bold">{apiErrorMessage}</p>
      )}
    </form>
  );
};

function setupBookingFormControls() {
  return useState([
    new FormControl("guestName", "text", "Guest Name:", [
      new ValidationFunctionWithErrorMessage(
        required,
        "Guest name is required"
      ),
    ]),
    new FormControl("guestEmail", "email", "Guest Email:", [
      new ValidationFunctionWithErrorMessage(required, "Email is required"),
      new ValidationFunctionWithErrorMessage(email, "Email is invalid"),
    ]),
    new FormControl("checkInDate", "date", "Check-In Date:", [
      new ValidationFunctionWithErrorMessage(
        required,
        "Check-in date is required"
      ),
    ]),
    new FormControl("checkOutDate", "date", "Check-Out Date:", [
      new ValidationFunctionWithErrorMessage(
        required,
        "Check-out date is required"
      ),
    ]),
    new FormControl("numberOfGuests", "number", "Number of Guests:", [
      new ValidationFunctionWithErrorMessage(
        required,
        "Number of guests is required"
      ),
      new ValidationFunctionWithErrorMessage(
        isPositiveNumber,
        "Number of guests must be a positive number"
      ),
    ]),
  ]);
}

function getInputComponent(inputObject, handleInputChange, inputClassNames) {
  switch (inputObject.type) {
    case "text":
      return (
        <TextInput
          inputObject={inputObject}
          handleInputChange={handleInputChange}
          inputClassNames={inputClassNames}
        />
      );
    case "email":
      return (
        <EmailInput
          inputObject={inputObject}
          handleInputChange={handleInputChange}
          inputClassNames={inputClassNames}
        />
      );
    case "date":
      return (
        <DateInput
          inputObject={inputObject}
          handleInputChange={handleInputChange}
          inputClassNames={inputClassNames}
        />
      );
    case "number":
      return (
        <NumberInput
          inputObject={inputObject}
          handleInputChange={handleInputChange}
          inputClassNames={inputClassNames}
        />
      );
    default:
      throw "Unsupported input type provided!";
  }
}

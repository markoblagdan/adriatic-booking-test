import { useEffect, useState } from "react";
import { calculateBookingPrice, saveBooking } from "../api";
import {
  FormControl,
  ValidationFunctionWithErrorMessage,
  required,
  email,
} from "../validation";
import FormInput from "./FormInput";

export const BookingForm = ({ apartment }) => {
  console.log("Render booking form");
  const [booking, setBooking] = setupBookingFormControls();
  const [apiSuccessMessage, setApiSuccessMessage] = useState(null);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(null);

  useEffect(() => {
    const callCalculateBooking = async () => {
      const bookingPriceWrapper = await calculateBookingPrice(apartment.id, {
        startDate: booking.checkInDate,
        endDate: booking.checkOutDate,
      });

      setBookingPrice(bookingPriceWrapper.bookingPrice);
    };

    if (booking.checkInDate && booking.checkOutDate) {
      callCalculateBooking();
    }
  }, [booking.checkInDate, booking.checkOutDate]);

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
      saveBooking({ id: null, apartmentId: apartment.id, ...booking }).then(
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

  // Important to use format 'yyyy-m-d' for the native input type="date"
  const minDateString = "2024-01-01";
  const maxDateString = "2024-12-31";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="p-6 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      {booking.map((bookingInputObject, index) => (
        <FormInput
          key={index}
          inputObject={bookingInputObject}
          handleInputChange={handleChange}
        />
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
    new FormControl("guestName", "Guest Name:", [
      new ValidationFunctionWithErrorMessage(
        required,
        "Guest name is required"
      ),
    ]),
    new FormControl("guestEmail", "Guest Email:", [
      new ValidationFunctionWithErrorMessage(required, "Email is required"),
      new ValidationFunctionWithErrorMessage(email, "Email is invalid"),
    ]),
    new FormControl("checkInDate", "Check-In Date:", [
      new ValidationFunctionWithErrorMessage(required),
    ]),
    new FormControl("checkOutDate", "Check-Out Date:", [
      new ValidationFunctionWithErrorMessage(required),
    ]),
    new FormControl(
      "numberOfGuests",
      "Number of Guests:",
      [new ValidationFunctionWithErrorMessage(required)],
      0
    ),
  ]);
}

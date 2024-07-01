import { useState, useEffect } from "react";
import { calculateBookingPrice, saveBooking } from "../api";

export const BookingForm = ({ apartment }) => {
  const [booking, setBooking] = useState({
    guestName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 0,
  });

  const [errors, setErrors] = useState({});
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
    let newErrors = {};

    if (!booking.guestName) newErrors.guestName = "Guest name is required";

    if (!booking.guestEmail) {
      newErrors.guestEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(booking.guestEmail)) {
      newErrors.guestEmail = "Email is invalid";
    }

    if (!booking.checkInDate)
      newErrors.checkInDate = "Check-in date is required";

    if (!booking.checkOutDate)
      newErrors.checkOutDate = "Check-out date is required";

    if (!booking.numberOfGuests) {
      newErrors.numberOfGuests = "Number of guests is required";
    } else if (isNaN(booking.numberOfGuests) || booking.numberOfGuests <= 0) {
      newErrors.numberOfGuests = "Number of guests must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "numberOfGuests") {
      value = parseInt(value);
    }

    setBooking({
      ...booking,
      [name]: value,
    });
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Guest Name:
        </label>
        <input
          type="text"
          name="guestName"
          value={booking.guestName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.guestName && (
          <p className="text-red-500 text-xs mt-2">{errors.guestName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Guest Email:
        </label>
        <input
          type="email"
          name="guestEmail"
          value={booking.guestEmail}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.guestEmail && (
          <p className="text-red-500 text-xs mt-2">{errors.guestEmail}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Check-In Date:
        </label>
        <input
          type="date"
          min={minDateString}
          max={maxDateString}
          name="checkInDate"
          value={booking.checkInDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.checkInDate && (
          <p className="text-red-500 text-xs mt-2">{errors.checkInDate}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Check-Out Date:
        </label>
        <input
          type="date"
          min={booking.checkInDate || minDateString}
          max={maxDateString}
          name="checkOutDate"
          value={booking.checkOutDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.checkOutDate && (
          <p className="text-red-500 text-xs mt-2">{errors.checkOutDate}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of Guests:
        </label>
        <input
          type="number"
          name="numberOfGuests"
          value={booking.numberOfGuests}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.numberOfGuests && (
          <p className="text-red-500 text-xs mt-2">{errors.numberOfGuests}</p>
        )}
      </div>
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

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getBookings, resolveBooking, deleteAllBookings } from "../api";

export default function BookingsList() {
  const [bookings, setBookings] = useState(useLoaderData());

  const handleResolve = async (bookingId) => {
    await resolveBooking(bookingId);
    const updatedBookings = await getBookings();

    setBookings(updatedBookings);
  };

  const handleDeleteAll = async () => {
    await deleteAllBookings();
    const updatedBookings = await getBookings();

    setBookings(updatedBookings);
  };

  const unresolvedBookings = bookings.filter((booking) => !booking.resolved);
  const resolvedBookings = bookings.filter((booking) => booking.resolved);

  const bookingHeaderClassNames = "text-2xl font-bold mb-4";
  const buttonClassNames =
    "px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700";

  return (
    <div className="p-8">
      <h2 className={bookingHeaderClassNames}>Unresolved Bookings</h2>
      <BookingTable
        bookings={unresolvedBookings}
        buttonClassNames={buttonClassNames}
        onResolve={handleResolve}
      />
      <h2 className={bookingHeaderClassNames}>Resolved Bookings</h2>
      <BookingTable
        bookings={resolvedBookings}
        buttonClassNames={buttonClassNames}
      />
      <button
        onClick={handleDeleteAll}
        className={buttonClassNames + " bg-red-500 hover:bg-red-700"}
      >
        Delete all
      </button>
    </div>
  );
}

const BookingTable = ({ bookings, onResolve, buttonClassNames }) => {
  const bookingTableHeaders = [
    "Booking Id",
    "Apartment Id",
    "Guest Name",
    "Guest Email",
    "Check In Date",
    "Check Out Date",
    "Number of guests",
    "Resolved",
  ];

  return (
    <div className="flex flex-col mb-8">
      <div className="flex bg-gray-200 font-bold p-4">
        {bookingTableHeaders.map((tableHeader) => (
          <div className="flex-1">{tableHeader}</div>
        ))}
      </div>
      {bookings.map((booking) => (
        <div className="flex items-center p-4 border-b" key={booking.id}>
          {Object.keys(booking).map((bookingObjectKey) => (
            <div className="flex-1">
              {bookingObjectKey !== "resolved" ? (
                booking[bookingObjectKey]
              ) : booking.resolved ? (
                "Yes"
              ) : (
                <button
                  onClick={() => onResolve(booking.id)}
                  className={buttonClassNames}
                >
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

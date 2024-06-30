import ListElement from "../components/ListElement";
import { NavLink, useLoaderData } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { calculateBookingPrice } from "../api";

export default function Apartment() {
  const apartment = useLoaderData();

  return (
    <>
      <div className="m-12">
        <h1 className="text-3xl font-bold">Apartman: {apartment.title}</h1>
        <BookingForm apartment={apartment} />
      </div>
    </>
  );
}

const BookingForm = ({ apartment }) => {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: "",
  });

  const [errors, setErrors] = useState({});
  const [bookingPrice, setBookingPrice] = useState(null);

  useEffect(() => {
    const calculateBookingPriceFromEffect = async () => {
      const bookingPriceWrapper = await calculateBookingPrice(apartment.id, {
        startDate: formData.checkInDate,
        endDate: formData.checkOutDate,
      });
      console.log(
        "Calculated booking price: " +
          JSON.stringify(bookingPriceWrapper.bookingPrice)
      );

      setBookingPrice(bookingPriceWrapper.bookingPrice);
    };

    if (formData.checkInDate && formData.checkOutDate) {
      calculateBookingPriceFromEffect();
    }
  }, [formData]);

  const validate = () => {
    let newErrors = {};

    if (!formData.guestName) newErrors.guestName = "Guest name is required";

    if (!formData.guestEmail) {
      newErrors.guestEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
      newErrors.guestEmail = "Email is invalid";
    }

    if (!formData.checkInDate)
      newErrors.checkInDate = "Check-in date is required";

    if (!formData.checkOutDate)
      newErrors.checkOutDate = "Check-out date is required";

    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = "Number of guests is required";
    } else if (isNaN(formData.numberOfGuests) || formData.numberOfGuests <= 0) {
      newErrors.numberOfGuests = "Number of guests must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // Process the form submission (e.g., send data to the server)
    }
  };

  const minDateString = "2024-01-01";
  const maxDateString = "2024-12-31";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Guest Name:
        </label>
        <input
          type="text"
          name="guestName"
          value={formData.guestName}
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
          value={formData.guestEmail}
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
          value={formData.checkInDate}
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
          min={formData.checkInDate || minDateString}
          max={maxDateString}
          name="checkOutDate"
          value={formData.checkOutDate}
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
          value={formData.numberOfGuests}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.numberOfGuests && (
          <p className="text-red-500 text-xs mt-2">{errors.numberOfGuests}</p>
        )}
      </div>
      {bookingPrice && (
        <p>
          Booking price for check in date <b>{formData.checkInDate}</b> and
          check out date <b>{formData.checkOutDate}</b>: {bookingPrice}
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Book Apartment
      </button>
    </form>
  );
};

// function BookingForm() {
//   const defaultControlState = {
//     errorText: null,
//     touched: false,
//     value: "",
//   };

//   const nameInputRef = useRef(null);
//   const emailInputRef = useRef(null);

//   const validateEmail = (formEmailData, emailInputElement) => {
//     if (!emailInputElement) {
//       return;
//     }
//     if (emailInputElement.validity.valueMissing) {
//       formEmailData.errorText = "Email is required.";
//     } else if (emailInputElement.validity.typeMismatch)
//       formEmailData.errorText = "Email is in an incorrect format.";
//     else formEmailData.errorText = null;
//   };

//   const [formData, setFormData] = useState({
//     guestName: {
//       ...defaultControlState,
//       controlRef: nameInputRef,
//       validate: function validateName() {
//         console.log(
//           "Validating form data object: " +
//             JSON.stringify(this.controlRef.current.validity)
//         );
//         if (!this.controlRef.current) {
//           return;
//         }
//         if (this.controlRef.current.validity.valueMissing)
//           this.errorText = "Guest name is required.";
//         else this.errorText = "null";
//       },
//     },
//     // guestEmail: {
//     //   ...defaultControlState,
//     //   controlRef: emailInputRef,
//     //   validate: validateEmail,
//     // },
//     // checkInDate: { ...defaultControlState },
//     // checkOutDate: { ...defaultControlState },
//     // numberOfGuests: { ...defaultControlState },
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     // let newErrors = {};

//     Object.keys(formData).forEach((formDataKey) => {
//       const specificControlData = formData[formDataKey];
//       const specificControlElement = specificControlData.controlRef.current;
//       specificControlData.validate(specificControlData, specificControlElement);
//     });

//     return (
//       nameInputRef.current.validity.valid &&
//       emailInputRef.current.validity.valid
//     );
//     // if (!formData.guestName.value)
//     //   newErrors.guestName = "Guest name is required";

//     // if (!formData.guestEmail.value) {
//     //   newErrors.guestEmail = "Email is required";
//     // } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
//     //   newErrors.guestEmail = "Email is invalid";
//     // }
//     // if (!formData.checkInDate)
//     //   newErrors.checkInDate = "Check-in date is required";
//     // if (!formData.checkOutDate)
//     //   newErrors.checkOutDate = "Check-out date is required";
//     // if (!formData.numberOfGuests) {
//     //   newErrors.numberOfGuests = "Number of guests is required";
//     // } else if (isNaN(formData.numberOfGuests) || formData.numberOfGuests <= 0) {
//     //   newErrors.numberOfGuests = "Number of guests must be a positive number";
//     // }

//     // setErrors(newErrors);
//     // return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: {
//         ...formData[name],
//         value,
//       },
//     });

//     formData[name].validate();

//     // validate();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validate()) {
//       alert("Form submitted successfully!");
//       // Process the form submission (e.g., send data to the server)
//     } else {
//     }
//   };

//   return (
//     <form
//       noValidate
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md"
//     >
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Guest Name:
//         </label>
//         <input
//           type="text"
//           name="guestName"
//           required
//           ref={nameInputRef}
//           value={formData.guestName.value}
//           onChange={(e) => handleChange(e)}
//           onBlur={() => (formData.guestName.touched = true)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {formData.guestName.touched && formData.guestName.errorText && (
//           <p className="text-red-500 text-xs mt-2">
//             {formData.guestName.errorText}
//           </p>
//         )}
//       </div>
//       {/* <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Guest Email:
//         </label>
//         <input
//           type="email"
//           required
//           name="guestEmail"
//           ref={emailInputRef}
//           value={formData.guestEmail.value}
//           onChange={() =>
//             formData.guestEmail.validate(
//               formData.guestEmail,
//               emailInputRef.current
//             )
//           }
//           onBlur={() => (formData.guestEmail.touched = true)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {formData.guestEmail.touched && errors.guestEmail.errorText && (
//           <p className="text-red-500 text-xs mt-2">
//             {errors.guestEmail.errorText}
//           </p>
//         )}
//       </div> */}
//       {/* <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Check-In Date:
//         </label>
//         <input
//           type="date"
//           name="checkInDate"
//           value={formData.checkInDate.value}
//           onChange={handleChange}
//           onBlur={() => (formData.checkInDate.touched = true)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {formData.checkInDate.touched && errors.checkInDate && (
//           <p className="text-red-500 text-xs mt-2">{errors.checkInDate}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Check-Out Date:
//         </label>
//         <input
//           type="date"
//           name="checkOutDate"
//           value={formData.checkOutDate.value}
//           onChange={handleChange}
//           onBlur={() => (formData.checkOutDate.touched = true)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {formData.checkOutDate.touched && errors.checkOutDate && (
//           <p className="text-red-500 text-xs mt-2">{errors.checkOutDate}</p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Number of Guests:
//         </label>
//         <input
//           type="number"
//           name="numberOfGuests"
//           value={formData.numberOfGuests.value}
//           onChange={handleChange}
//           onBlur={() => (formData.numberOfGuests.touched = true)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {formData.numberOfGuests.touched && errors.numberOfGuests && (
//           <p className="text-red-500 text-xs mt-2">{errors.numberOfGuests}</p>
//         )}
//       </div> */}
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Book Apartment
//       </button>
//     </form>
//   );
// }

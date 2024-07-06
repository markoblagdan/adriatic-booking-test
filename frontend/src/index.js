import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  getApartment,
  getBookings,
  getHouseByApartmentId,
  getHouse,
  getHouses,
} from "./api";
import Apartment from "./pages/Apartment";
import BookingsList from "./pages/BookingsList";
import HouseApartmentList from "./pages/HouseApartmentList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const houses = await getHouses();
      return { houses };
    },
  },
  {
    path: "house/:id",
    element: <HouseApartmentList />,
    loader: async ({ params }) => {
      return getHouse(params.id);
    },
  },
  {
    path: "apartment/:id",
    element: <Apartment />,
    loader: async ({ params }) => {
      const house = await getHouseByApartmentId(params.id);
      const apartment = await getApartment(params.id);

      return { house, apartment };
    },
  },
  {
    path: "bookings",
    element: <BookingsList />,
    loader: async () => {
      return getBookings();
    },
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

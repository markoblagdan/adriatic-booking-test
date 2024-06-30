import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import House from "./pages/House";
import { getApartment, getHouses } from "./api";
import Apartment from "./pages/Apartment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "house/:id",
    element: <House />,
    loader: async () => {
      return getHouses();
    },
  },
  {
    path: "apartment/:id",
    element: <Apartment />,
    loader: async ({ params }) => {
      return getApartment(params.id);
    },
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

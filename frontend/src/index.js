import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import House from "./pages/House";
import { getHouses } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "house/:id",
        element: <House />,
        loader: async () => {
          return getHouses();
        },
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

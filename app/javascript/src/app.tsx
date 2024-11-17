import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  Cities,
  City,
  Households,
  CityHouseholds,
  Household,
  EnergyPricingPlans,
} from "./routes";
import { Root as Page } from "./layouts";
export const Root = {
  path: "/",
  element: <Page />,
  children: [
    { path: "/", element: <Navigate to="/cities" /> },
    Cities,
    City,
    Households,
    CityHouseholds,
    Household,
    EnergyPricingPlans,
  ],
};

const router = createBrowserRouter([Root]);
export const App = () => <RouterProvider router={router} />;

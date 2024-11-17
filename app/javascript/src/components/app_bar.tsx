import React from "react";
import { Navbar } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { HousePlug, Building, Lightbulb } from "lucide-react";

export const AppBar = () => {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="flex-col sm:flex-row gap-4 rounded-none justify-between from-blue-gray-900 to-blue-gray-800 px-4 py-2"
    >
      <div className="flex gap-4">
        <NavLink
          to="/cities"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-x-2 p-1 font-medium`
          }
        >
          <Building />
          Cities
        </NavLink>
        <NavLink
          to="/households"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-x-2 p-1 font-medium`
          }
        >
          <HousePlug />
          Households
        </NavLink>
        <NavLink
          to="/energy_pricing_plans"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} flex items-center gap-x-2 p-1 font-medium`
          }
        >
          <Lightbulb />
          Energy Pricing API
        </NavLink>
      </div>
      <div className="relative flex w-full gap-2 md:w-max"></div>
    </Navbar>
  );
};

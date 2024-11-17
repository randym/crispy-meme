import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../components";

export const Root = () => {
  return (
    <>
      <AppBar />
      <div className="flex flex-grow bg-gray-200">
        <Outlet />
      </div>
    </>
  );
};

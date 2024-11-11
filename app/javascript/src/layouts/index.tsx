import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../components";

export const Root = () => {
  return (
    <>
      <AppBar />
      <div className="pt-16 z-0">
        <Outlet />
      </div>
    </>
  );
};

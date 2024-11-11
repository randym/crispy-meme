import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { Household as Card } from "../components";

export const Household = () => {
  const household = useLoaderData() as HouseholdModel;

  return (
    <>
      <Typography variant="h4" className="m-4">
        Household
      </Typography>
      <Card item={household} />
    </>
  );
};

import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import {
  InfiniteScrollingList,
  City as Card,
  Household as ComponentType,
} from "../components";

export const City = () => {
  const { city, firstPage, source } = useLoaderData() as {
    city: CityModel;
    firstPage: readonly HouseholdModel[];
    source: Paginating<HouseholdModel>;
  };

  const props = { firstPage, source, ComponentType };

  return (
    <>
      <Typography variant="h4" className="m-4">
        City
      </Typography>

      <Card item={city} />
      <InfiniteScrollingList {...props} />
    </>
  );
};

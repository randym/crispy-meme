import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import {
  InfiniteScrollingList,
  Household as ComponentType,
} from "../components";
export const Households = () => {
  const { firstPage, source } = useLoaderData() as {
    firstPage: readonly HouseholdModel[];
    source: Paginating<HouseholdModel>;
  };
  const props = { firstPage, source, ComponentType };

  return (
    <>
      <InfiniteScrollingList {...props} />
    </>
  );
};

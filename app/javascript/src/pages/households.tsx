import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  InfiniteScrollingList,
  Household,
  EnergyProductionCard,
} from "../components";

export const Households = () => {
  const { firstPage, source } = useLoaderData() as {
    firstPage: readonly HouseholdModel[];
    source: Paginating<HouseholdModel>;
  };

  const renderItem = (item: HouseholdModel) => {
    return <EnergyProductionCard Detail={Household} item={item} />;
  };

  const props = { firstPage, source, renderItem };

  return <InfiniteScrollingList {...props} />;
};

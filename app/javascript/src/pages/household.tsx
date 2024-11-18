import React from "react";
import { useLoaderData } from "react-router-dom";
import { EnergyProductionCard, Household as Detail } from "../components";

export const Household = () => {
  const household = useLoaderData() as HouseholdModel;

  return <EnergyProductionCard Detail={Detail} item={household} />;
};

import React from "react";
import { EnergyPricingPlans as Page } from "../pages";
import { EnergyPricingPlan as source } from "../models";

export const EnergyPricingPlans = {
  path: "/energy_pricing_plans",
  element: <Page />,
  loader: async () => {
    const firstPage = await source.page(1);
    return { firstPage, source };
  },
};

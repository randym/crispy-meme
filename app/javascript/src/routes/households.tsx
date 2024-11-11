import React from "react";
import { Households as Page } from "../pages";
import { Household as source } from "../models";

export const Households = {
  path: "/households",
  element: <Page />,
  loader: async () => {
    const firstPage = await source.page(1);
    return { firstPage, source };
  },
};

import React from "react";
import { LoaderFunctionArgs } from "react-router-dom";
import { City as Page } from "../pages";
import { City as Model } from "../models";
import { PagedArray } from "../lib/utils/paged_array";

export const City = {
  path: "/cities/:id",
  element: <Page />,
  loader: async ({ params }: LoaderFunctionArgs) => {
    const id = parseInt(params.id!);
    const city = await Model.find(id);
    const households = city.households as readonly HouseholdModel[];
    const source = new PagedArray(...households);
    const firstPage = await source.page(1);

    return { city, firstPage, source };
  },
};

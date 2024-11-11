import React from "react";
import { LoaderFunctionArgs } from "react-router-dom";
import { Household as Page } from "../pages";
import { Household as source } from "../models";

export const Household = {
  path: "/households/:id",
  element: <Page />,
  loader: async ({ params }: LoaderFunctionArgs) => {
    const id = parseInt(params.id!);
    const household = await source.find(id);
    return household;
  },
};

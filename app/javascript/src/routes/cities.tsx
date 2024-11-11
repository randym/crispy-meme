import React from "react";
import { Cities as Page } from "../pages";
import { City as source } from "../models";

export const Cities = {
  path: "/cities",
  element: <Page />,
  loader: async () => {
    const firstPage = await source.page(1);
    return { firstPage, source };
  },
};

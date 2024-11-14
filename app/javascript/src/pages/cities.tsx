import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { City as ComponentType } from "../components";
import { InfiniteScrollingList } from "../components/infinite_scrolling_list";
export const Cities = () => {
  const { firstPage, source } = useLoaderData() as {
    firstPage: readonly CityModel[];
    source: Paginating<CityModel>;
  };
  const props = { firstPage, source, ComponentType };

  return (
    <>
      <InfiniteScrollingList {...props} />
    </>
  );
};

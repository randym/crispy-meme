import React from "react";
import { useLoaderData } from "react-router-dom";
import { EnergyProductionCard } from "../components";
import { City } from "../components";
import { InfiniteScrollingList } from "../components/infinite_scrolling_list";

export const Cities = () => {
  const { firstPage, source } =
    useLoaderData() as PaginatingLoaderData<CityModel>;

  const renderItem = (item: CityModel) => {
    return <EnergyProductionCard Detail={City} item={item} />;
  };

  const props = { firstPage, source, renderItem };

  return <InfiniteScrollingList {...props} />;
};

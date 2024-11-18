import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  InfiniteScrollingList,
  EnergyProductionCard,
  City as Detail,
  Household,
} from "../components";

interface LoaderData extends PaginatingLoaderData<HouseholdModel> {
  city: CityModel;
}
export const City = () => {
  const { city, firstPage, source } = useLoaderData() as LoaderData;

  const renderItem = (item: HouseholdModel) => {
    return <EnergyProductionCard Detail={Household} item={item} />;
  };

  const props = { firstPage, source, renderItem };

  return (
    <div className="w-full p-4">
      <EnergyProductionCard Detail={Detail} item={city} />
      <InfiniteScrollingList {...props} />
    </div>
  );
};

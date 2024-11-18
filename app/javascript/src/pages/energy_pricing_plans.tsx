import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { InfiniteScrollingList } from "../components";
import { EnergyPricingPlan } from "../components/energy_pricing_plan";

// TODO: Refactor!

export const EnergyPricingPlans = () => {
  const { firstPage, source } =
    useLoaderData() as PaginatingLoaderData<EnergyPricingPlanModel>;

  const [cost, setCost] = React.useState<number | null>(null);
  const [detail, setDetail] = React.useState<any | null>(null);

  const onClick = async (item: EnergyPricingPlanModel) => {
    const result = await item.getCost();
    const { energyCharge, energyChargeDetail } = result;

    setCost(energyCharge);
    setDetail(energyChargeDetail);
  };

  const clickHandler = (item: EnergyPricingPlanModel) => () => {
    onClick(item);
  };

  const renderItem = (item: EnergyPricingPlanModel) => {
    return <EnergyPricingPlan item={item} onClick={clickHandler(item)} />;
  };
  const props = { firstPage, source, renderItem };

  return (
    <div className="flex flex-col w-full p-4">
      {/* 
      TODO: if we end up doing another left/right split that collapses, extract this
      */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2">
          <Typography variant="lead">Plans</Typography>
          <div className="bg-gray-100">
            <InfiniteScrollingList {...props} />
          </div>
        </div>
        {/* 
        This can be extracted into a separate component that takes cost as a param
        but the wrapper half width div needs to be left behind as structure
        */}
        <div className="w-full md:w-1/2 md:ml-4">
          <Typography variant="lead">API Output</Typography>
          <pre className="bg-gray-100 border border-gray-300 rounded p-4 font-mono text-sm">
            {cost || "Select a Plan to get cost"}
          </pre>
        </div>
      </div>
      {/* this could be detail view where we pass in "detail"
       or it could be more agnostic and just be a "code" rendering component
       */}
      <div className="mt-4">
        <Typography variant="lead">Calculation Details</Typography>
        <pre className="bg-gray-100 border border-gray-300 rounded p-4 font-mono text-sm overflow-x-auto">
          {detail && JSON.stringify(detail, null, 2)}
        </pre>
      </div>
    </div>
  );
};

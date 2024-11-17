import React from "react";
import { useLoaderData } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { InfiniteScrollingList } from "../components";
import { EnergyPricingPlan as ComponentType } from "../components/energy_pricing_plan";
export const EnergyPricingPlans = () => {
  const { firstPage, source } = useLoaderData() as {
    firstPage: readonly IEnergyPricingPlan[];
    source: Paginating<IEnergyPricingPlan>;
    componentType: typeof ComponentType;
  };

  const [cost, setCost] = React.useState<number | null>(null);
  const [detail, setDetail] = React.useState<any | null>(null);

  const onItemClick = async (item: EnergyPricingPlanModel) => {
    const cost = await item.getCost();
    const { energyCharge, energyChargeDetail } = cost.data.attributes;

    setCost(energyCharge);
    setDetail(energyChargeDetail);
  };

  const props = { firstPage, source, ComponentType, onItemClick };

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2">
          <Typography variant="lead">Plans</Typography>
          <div className="bg-gray-100">
            <InfiniteScrollingList {...props} />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:ml-4">
          <Typography variant="lead">API Output</Typography>
          <pre className="bg-gray-100 border border-gray-300 rounded p-4 font-mono text-sm">
            {cost || "Select a Plan to get cost"}
          </pre>
        </div>
      </div>
      <div className="mt-4">
        <Typography variant="lead">Calculation Details</Typography>
        <pre className="bg-gray-100 border border-gray-300 rounded p-4 font-mono text-sm overflow-x-auto">
          {detail && JSON.stringify(detail, null, 2)}
        </pre>
      </div>
    </div>
  );
};

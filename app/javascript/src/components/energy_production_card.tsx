import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { EnergyProductionCharts } from "./energy_production_charts";

interface Props {
  item: CityModel | HouseholdModel;
  Detail: React.FC<{
    viewModel: {
      tabs: Record<string, string>;
      charts: Record<string, ChartProps>;
    };
  }>;
}

const Component: React.FC<Props> = ({ Detail, item }) => {
  const viewModel = item.viewModel;

  return (
    <Card className="mt-1">
      <CardBody>
        <div className="flex flex-col lg:flex-row gap-6">
          <Detail viewModel={viewModel} />
          <div className="flex-grow">
            <EnergyProductionCharts viewModel={viewModel} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const EnergyProductionCard = React.memo(Component);

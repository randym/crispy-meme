import React from "react";
import { Card as ReactCard, CardBody } from "@material-tailwind/react";
import { Charts } from "./charts";

interface CardProps {
  Detail: React.ComponentType;
  viewModel: {
    tabs: Record<string, string>;
    charts: Record<string, ChartProps>;
  };
}
export const Card: React.FC<CardProps> = ({ Detail, viewModel }) => {
  return (
    <ReactCard className="mt-1">
      <CardBody>
        <div className="flex flex-col lg:flex-row gap-6">
          <Detail />
          <div className="flex-grow">
            <Charts viewModel={viewModel} />
          </div>
        </div>
      </CardBody>
    </ReactCard>
  );
};

export const MemoCard = React.memo(Card);

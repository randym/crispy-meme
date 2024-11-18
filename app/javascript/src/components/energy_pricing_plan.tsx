import React from "react";
import { ListItem } from "@material-tailwind/react";

interface Props {
  item: EnergyPricingPlanModel;
  onClick: () => void;
}

export const EnergyPricingPlan: React.FC<Props> = (props) => {
  const { item, onClick } = props;
  const viewModel = item.viewModel;

  return <ListItem onClick={onClick}>{viewModel.name}</ListItem>;
};

export const MemoEnergyPricingPlan = React.memo(EnergyPricingPlan);

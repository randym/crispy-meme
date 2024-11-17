import React from "react";
import { EnergyPricingPlan as Model } from "../../models";
import { ListItem } from "@material-tailwind/react";
export const EnergyPricingPlan: React.FC<ListableItemProps> = ({ item }) => {
  const viewModel = (item as Model).viewModel;

  return <ListItem>{viewModel.name}</ListItem>;
};

export const MemoEnergyPricingPlan = React.memo(EnergyPricingPlan);

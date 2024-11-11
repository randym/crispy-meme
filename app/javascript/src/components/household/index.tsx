import React from "react";

import { Household as Model } from "../../models/household";
import { Card } from "../";
import { Detail } from "./detail";

export const Household: React.FC<ListableItemProps> = ({ item }) => {
  const viewModel = (item as Model).viewModel;

  return (
    <Card
      viewModel={viewModel}
      Detail={() => <Detail viewModel={viewModel} />}
    />
  );
};

export const MemoHousehold = React.memo(Household);

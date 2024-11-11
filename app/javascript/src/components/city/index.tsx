import React from "react";

import { City as Model } from "../../models/city";
import { Card } from "../";
import { Detail } from "./detail";

export const City: React.FC<ListableItemProps> = ({ item }) => {
  const viewModel = (item as Model).viewModel;

  return (
    <Card
      viewModel={viewModel}
      Detail={() => <Detail viewModel={viewModel} />}
    />
  );
};

export const MemoCity = React.memo(City);

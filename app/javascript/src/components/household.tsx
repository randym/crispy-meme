import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LabeledField } from "./";
interface Props {
  viewModel: {
    tabs: Record<string, string>;
    charts: Record<string, ChartProps>;
  };
}
export const Household: React.FC<Props> = ({ viewModel }) => {
  const { url, fullName, general, averages, city } =
    viewModel as HouseholdViewModel;
  return (
    <div className="max-w-96 min-w-64 sm:min-w-48 md:min-w-64 lg:min-w-80 xl:min-w-96">
      <Link to={url}>
        <Typography variant="h4">{fullName}</Typography>
      </Link>
      <div className="ml-2">
        <LabeledField label={"City"} key={"City"}>
          <Link to={city.url}>{city.name}</Link>
        </LabeledField>
        {Object.entries(general).map(([label, value]) => (
          <LabeledField label={label} key={label}>
            {value}
          </LabeledField>
        ))}
      </div>
      <Typography variant="lead">Monthly Averages</Typography>
      <div className="ml-2">
        {Object.entries(averages).map(([label, value]) => (
          <LabeledField label={label} key={label}>
            {value}
          </LabeledField>
        ))}
      </div>
    </div>
  );
};

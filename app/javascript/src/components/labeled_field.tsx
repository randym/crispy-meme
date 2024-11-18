import React from "react";
import { Typography } from "@material-tailwind/react";
interface Props {
  label: string;
  children: React.ReactNode;
}

export const LabeledField: React.FC<Props> = (props) => {
  const { label = "", children } = props;

  return (
    <div className="flex justify-between">
      <Typography>{label}</Typography>
      <Typography variant="lead">{children}</Typography>
    </div>
  );
};

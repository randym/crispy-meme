import React from "react";
import { Typography } from "@material-tailwind/react";

export const LabeledField = (props: {
  label: string;
  children: React.ReactNode;
}) => {
  const { label = "", children } = props;

  return (
    <div className="flex justify-between">
      <Typography>{label}</Typography>
      <Typography variant="lead">{children}</Typography>
    </div>
  );
};

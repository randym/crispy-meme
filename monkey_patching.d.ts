import {} from "@material-tailwind/react";
import React from "react";
declare module "@material-tailwind/react" {
  type EventCapture = {
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  };

  export interface ButtonProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface InputProps extends EventCapture {
    crossOrigin?: unknown;
  }
  export interface SelectProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface ListProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }

  export interface ListItemProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }

  export interface NavbarProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }

  export interface TypographyProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface CardProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface CardHeaderProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface CardBodyProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface TabsHeaderProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface TabProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
  export interface TabsBodyProps extends EventCapture {
    placeholder?: unknown;
    children: React.ReactNode;
  }
}

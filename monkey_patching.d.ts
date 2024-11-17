import {} from "@material-tailwind/react";
declare module "@material-tailwind/react" {
  type EventCapture = {
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
  };

  export interface NavbarProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface TypographyProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface CardProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface CardBodyProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface TabsHeaderProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface TabProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface TabsBodyProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface ButtonProps extends EventCapture {
    placeholder?: unknown;
  }

  export interface ListItemProps extends EventCapture {
    placeholder?: unknown;
  }
  export interface ListProps extends EventCapture {
    placeholder?: unknown;
  }
}

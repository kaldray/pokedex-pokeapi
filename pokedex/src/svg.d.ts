declare module "*.svg" {
  import React, { FunctionComponentFactory } from "react";
  export const ReactComponent: FunctionComponentFactory<React.SVGProps<SVGSVGElement>>;
}

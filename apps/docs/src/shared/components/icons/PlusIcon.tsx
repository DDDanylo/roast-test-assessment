import * as React from "react";
import { SVGProps } from "react";

const PlusIcon = ({
  width = 24,
  height = 24,
  stroke = "#fff",
  strokeWidth = 3,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M5 12h14M12 5v14"
    />
  </svg>
);

export default React.memo(PlusIcon);

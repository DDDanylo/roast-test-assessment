import * as React from "react";
import { SVGProps } from "react";

const CloseIcon = ({
  width = 24,
  height = 24,
  stroke = "#000",
  strokeWidth = 3,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M18 6 6 18M6 6l12 12"
    />
  </svg>
);

export default React.memo(CloseIcon);

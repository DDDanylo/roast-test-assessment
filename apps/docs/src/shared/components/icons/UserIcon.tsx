import * as React from "react";
import { SVGProps } from "react";

const UserIcon = ({
  width = 36,
  height = 36,
  stroke = "#8F8F8F",
  strokeWidth = 2,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M28.5 31.5v-3a6 6 0 0 0-6-6h-9a6 6 0 0 0-6 6v3M18 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
  </svg>
);

export default React.memo(UserIcon);

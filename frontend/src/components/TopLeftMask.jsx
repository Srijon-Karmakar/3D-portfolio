import React from "react";

export default function TopLeftMask() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 2048 1442"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-left grey mask */}
      <path
        fill="#d8d8d8"
        d="
          M 0 0
          H 2048
          V 360
          C 1760 355, 1605 410, 1500 500
          C 1410 575, 1380 660, 1410 735
          C 1440 805, 1520 835, 1625 825
          C 1715 818, 1795 780, 1865 720
          C 1935 660, 1998 585, 2048 520
          V 0
          H 0
          Z
        "
      />
    </svg>
  );
}

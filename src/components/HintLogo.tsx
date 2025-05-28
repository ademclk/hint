import { HTMLAttributes } from "react";

interface HintLogoProps extends HTMLAttributes<SVGElement> {
  size?: number;
  color?: string;
}

export function HintLogo({ size = 180, color = "currentColor", className = "", ...props }: HintLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Loop */}
      <path
        d="M100 10C149.706 10 190 50.294 190 100C190 149.706 149.706 190 100 190C50.294 190 10 149.706 10 100C10 50.294 50.294 10 100 10Z"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="8 4"
        className="animate-[spin_20s_linear_infinite]"
      />
      
      {/* Middle Loop */}
      <path
        d="M100 30C138.66 30 170 61.34 170 100C170 138.66 138.66 170 100 170C61.34 170 30 138.66 30 100C30 61.34 61.34 30 100 30Z"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6 3"
        className="animate-[spin_15s_linear_infinite_reverse]"
      />
      
      {/* Inner Loop */}
      <path
        d="M100 50C127.614 50 150 72.386 150 100C150 127.614 127.614 150 100 150C72.386 150 50 127.614 50 100C50 72.386 72.386 50 100 50Z"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="4 2"
        className="animate-[spin_10s_linear_infinite]"
      />

      {/* H */}
      <path
        d="M70 80V120M70 100H90M90 80V120"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* I */}
      <path
        d="M100 80V120"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* N */}
      <path
        d="M110 120V80L130 120V80"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* T */}
      <path
        d="M140 80H160M150 80V120"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

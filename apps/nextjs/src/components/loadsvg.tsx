"use client";
import { useTheme } from 'next-themes';

import Image from "next/image";
import { cn } from "@saasfly/ui";

interface ThemedSVGProps {
    width?: number;
    height?: number;
    alt?: string;
    className?: string;
    svgurl_dark: string;
    svgurl_light:string;
  };

export const ThemedSVG: React.FC<ThemedSVGProps> = (
    { width=64,
        height=64,
        alt='logo',
        className,
        svgurl_dark,
        svgurl_light
       }
    ) => {
      const { theme } = useTheme();
    return (
            /*
        src={theme === 'light' ? svgurl_light : svgurl_dark}
        src={svgurl_light}
        */
      <Image
      src={theme === 'light' ? svgurl_light : svgurl_dark}
        className={cn("mx-auto", className)}
        width={width}
        height={height}
        alt={alt}
      />
    )
  };

  export default ThemedSVG;

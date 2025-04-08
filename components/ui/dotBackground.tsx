import { cn } from "@/lib/utils";
import React from "react";

export function DotBackgroundDemo({ className, Container }: { className?: string, Container?: boolean }) {
  return (
    <div className={cn("flex w-full", className)}>
      <div
        className={cn(
          "absolute inset-0 [background-size:20px_20px]",
          !Container ? "[background-image:radial-gradient(#824124,transparent_1px)]" : "[background-image:radial-gradient(#824124,transparent_1px)]"
        )}

      />
      {/* Radial gradient for the container to give a faded look */}
      {Container ?
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" /> :
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
      }

    </div>
  );
}

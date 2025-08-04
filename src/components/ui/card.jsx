import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 border-b", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardContent = ({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 pb-6 pt-2 border-t", className)}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardContent, CardFooter };

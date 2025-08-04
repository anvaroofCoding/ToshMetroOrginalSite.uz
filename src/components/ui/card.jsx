import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm",
        className
      )}
      {...props}
    />
  );
});

const CardHeader = forwardRef(function CardHeader(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("p-6 border-b", className)} {...props} />;
});

const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});

const CardDescription = forwardRef(function CardDescription(
  { className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

const CardContent = forwardRef(function CardContent(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

const CardFooter = forwardRef(function CardFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("px-6 pb-6 pt-2 border-t", className)}
      {...props}
    />
  );
});

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

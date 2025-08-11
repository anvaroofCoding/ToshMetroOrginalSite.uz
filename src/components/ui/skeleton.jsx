import React, { forwardRef } from "react";

// Simple utility to join class names
const cn = (...args) => args.filter(Boolean).join(" ");

/**
 * Skeleton komponenti (JavaScript + React, Tailwind bilan mos)
 * Props:
 * - variant: 'rect' | 'text' | 'circle' (default: 'rect')
 * - width, height: CSS value yoki Tailwind sinflari uchun string
 * - className: qo'shimcha sinflar
 * - animated: boolean (pulse animatsiya yoqilgan/ochirilgan)
 * - style: inline style obyekti
 *
 * Misol:
 * <Skeleton width="w-full" height="h-4" />
 * <Skeleton variant="circle" width="w-10" height="w-10" />
 */
const Skeleton = forwardRef(
  (
    {
      variant = "rect",
      width = "100%",
      height = "1rem",
      className = "",
      animated = true,
      style = {},
      ...props
    },
    ref
  ) => {
    // Agar foydalanuvchi Tailwind sinfi bermoqchi bo'lsa, width/height qiymatlari
    // `w-10` yoki `h-4` kabi sinflar bo'lishi mumkin. Biz ikkita usulni qo'llab-quvvatlaymiz:
    // 1) Agar width/height string ichida `w-` yoki `h-` ko'rinsa -> uni sinf sifatida ishlatamiz
    // 2) aks holda inline style sifatida uzatamiz

    const widthIsClass =
      typeof width === "string" &&
      /(^w-|^\d|%|px|rem|em)/.test(width) &&
      width.includes("w-") === false
        ? false
        : typeof width === "string" && width.startsWith("w-");
    const heightIsClass = typeof height === "string" && height.startsWith("h-");

    const baseClasses =
      "bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-md relative";
    const animationClass = animated ? "animate-pulse" : "";

    // variant-specific classes
    const variantClasses =
      {
        rect: "",
        text: "rounded-sm",
        circle: "rounded-full",
      }[variant] || "";

    // Build className
    let computedClassName = cn(
      baseClasses,
      variantClasses,
      animationClass,
      className
    );

    // Build style
    const inlineStyle = { ...style };
    if (!widthIsClass) inlineStyle.width = width;
    if (!heightIsClass) inlineStyle.height = height;
    // If height is not provided as class and variant is text, give a sensible default
    if (!height && variant === "text") inlineStyle.height = "1rem";

    // If width/height are Tailwind classes, append them to computedClassName
    if (widthIsClass) computedClassName = cn(computedClassName, width);
    if (heightIsClass) computedClassName = cn(computedClassName, height);

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        className={computedClassName}
        style={inlineStyle}
        {...props}
      >
        {/* Decorative inner gradient to make skeleton look nicer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 pointer-events-none" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

export default Skeleton;

// Named helpers
export const SkeletonText = (props) => <Skeleton variant="text" {...props} />;
export const SkeletonCircle = (props) => (
  <Skeleton variant="circle" {...props} />
);

"use client";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

export function FaqAccordion({
  data,
  className,
  questionClassName,
  answerClassName,
}) {
  const [openItem, setOpenItem] = React.useState(null);

  return (
    <div className={cn("p-4 w-full", className)}>
      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
        className=" w-full"
      >
        {data.map((item) => (
          <Accordion.Item
            value={item.id.toString()}
            key={item.id}
            className="mb-2 "
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4">
                <div
                  className={cn(
                    "relative flex items-center space-x-2 rounded-xl  p-2 transition-colors",
                    openItem === item.id.toString()
                      ? "bg-primary/20 text-primary"
                      : "bg-blue-600 hover:bg-blue-600",
                    questionClassName,
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute bottom-6",
                        item.iconPosition === "right" ? "right-0" : "left-0",
                      )}
                      style={{
                        transform:
                          item.iconPosition === "right"
                            ? "rotate(7deg)"
                            : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium text-white">{item.question}</span>
                </div>

                <span
                  className={cn(
                    "text-muted-foreground",
                    openItem === item.id.toString() && "text-primary",
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="ml-7 mt-1 md:ml-16">
                  <div
                    className={cn(
                      "relative rounded-2xl bg-primary px-4 py-2 text-primary-foreground",
                      answerClassName,
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

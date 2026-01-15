import { useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const types = {
  success: "!bg-success !text-white",
  warning: "!bg-warning !text-black",
  error: "!bg-error !text-white",
  violet: "!bg-violet !text-white",
  default: "!bg-foreground !text-background-100",
};

export const Tooltip = ({
  children,
  text,
  position = "top",
  delay = true,
  boxAlign = "center",
  type = "default",
  tip = true,
  center = true,
}) => {
  const id = useId();

  return (
    <div>
      <div id={id} className="font-sans">
        {children}
      </div>
      <ReactTooltip
        anchorSelect={`#${id}`}
        place={`${position}${
          { left: "-start", right: "-end", center: "" }[boxAlign]
        }`}
        delayShow={delay ? 500 : 0}
        opacity={1}
        noArrow={!tip}
        className={`!font-sans !text-[13px] !max-w-52 !rounded-lg ${
          types[type]
        }${center ? " text-center" : " text-start"}`}
      >
        {text}
      </ReactTooltip>
    </div>
  );
};

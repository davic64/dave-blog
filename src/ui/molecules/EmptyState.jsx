import { IconFileSmileFilled } from "@tabler/icons-react";

export const EmptyState = ({ text, fullScreen, className, button }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "h-screen" : ""
      } gap-4 animate-fade-in ${className}`}
    >
      <IconFileSmileFilled size={80} className="animate-bounce" />
      <h1 className="text-4xl font-thin flex items-center gap-2 animate-pulse">
        {text}
      </h1>
      {button && button}
    </div>
  );
};

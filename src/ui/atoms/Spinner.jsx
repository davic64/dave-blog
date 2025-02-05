import { IconLoader2 } from "@tabler/icons-react";

export const Spinner = ({ className }) => {
  return (
    <div>
      <IconLoader2 className={`animate-spin ${className}`} />
    </div>
  );
};

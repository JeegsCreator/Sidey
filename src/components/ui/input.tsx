import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

type InputWithIconProps = InputProps & {
  Icon: LucideIcon;
};

const InputWithIcon = ({ Icon, ...props }: InputWithIconProps) => {
  return (
    <div className="relative flex items-center h-full">
      <Input className="pr-10" {...props} />
      <Icon className="absolute right-3 text-slate-500" size={18} />
    </div>
  );
};

export { Input, InputWithIcon };

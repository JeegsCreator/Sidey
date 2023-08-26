import { BookTemplate, LucideIcon } from "lucide-react";

const Empty = ({
  message,
  Icon = BookTemplate,
}: {
  message: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3 text-slate-300 pointer-events-none">
      <span className="text-3xl text-center font-medium w-1/2 ">{message}</span>
      <Icon size={40} />
    </div>
  );
};

export default Empty;

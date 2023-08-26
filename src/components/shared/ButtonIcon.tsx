import { BookTemplate, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import Link from "next/link";

interface ButtonIconProps {
  href?: string;
  Icon: LucideIcon;
  text?: string;
  size?: number;
  variant: ButtonProps["variant"];
  className?: string;
}

const ButtonIcon = ({
  href,
  Icon = BookTemplate,
  text,
  size,
  variant,
  className,
}: ButtonIconProps) => {
  return (
    <Button
      variant={variant}
      size="icon"
      asChild={Boolean(href)}
      className={className}
    >
      {href ? (
        <Link href={href} className="text-sm">
          <Icon size={size} /> {text ?? ""}
        </Link>
      ) : (
        <Icon size={size} />
      )}
    </Button>
  );
};

export default ButtonIcon;
